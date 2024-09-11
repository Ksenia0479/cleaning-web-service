const express = require("express");
const router = express.Router();
const _ = require("lodash");

// models
const User = require("../models/Users");
const Order = require("../models/Orders");

// middleware
const auth = require("../middleware/auth");

// utils
const convertDateTimeToISO = require("../utils/converDateTimeToISO");

router.post("/orders", async (req, res) => {
  let {
    body: { order },
    headers: { host, authorization }
  } = req;

  const token = authorization;

  try {
    order.creator._id = await User.defineUserId(token);
    order.orderNumber = Order.generateOrderNumber();

    if (!_.isObject(order.creator.contact)) {
      order.creator.contact = User.defineContactType(order.creator.contact);
    }

    order = await new Order(order);
    await order.save();

    const { assignee, _id } = order;
    User.sendBookingNotificationEmail({ _id, assignee, host });

    res.status(201).send({ _id });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/orders", auth, async (req, res) => {
  const { user } = req;

  try {
    await user.populate({ path: "orders" }).execPopulate();

    const dataToBeOrdered = "orders";
    const orderKeys = ["createdAt"];
    const orderBy = ["desc"];

    const sortedOrders = _.orderBy(user[dataToBeOrdered], orderKeys, orderBy);

    res.status(200).send(sortedOrders);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/orders/:_id", async (req, res) => {
  const orderKeysToBePicked = [
    "creator",
    "address",
    "services",
    "rooms",
    "date",
    "time",
    "frequency",
    "price",
    "processed",
    "orderNumber"
  ];

  const {
    params: { _id }
  } = req;

  try {
    const order = await Order.findById({ _id });

    Order.checkOrderExistance(order);

    const filteredOrder = _.pick(order, orderKeysToBePicked);

    res.status(200).send(filteredOrder);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch("/orders/:_id/approve", auth, async (req, res) => {
  const {
    headers: { host },
    params: { _id }
  } = req;

  try {
    const order = await Order.findById({ _id });

    Order.checkOrderExistance(order);

    order.processed.status = "approved";
    await order.save();

    const emailParams = { host };
    order.sendApprovedOrderEmail(emailParams);

    res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch("/orders/:_id/deny", auth, async (req, res) => {
  const {
    user: { companyName },
    headers: { host },
    body: { message },
    params: { _id }
  } = req;

  try {
    const order = await Order.findById({ _id });

    Order.checkOrderExistance(order);

    order.processed.message = message;
    order.processed.status = "denied";
    await order.save();

    const emailParams = { host, companyName, message };
    order.sendDeniedOrderEmail(emailParams);

    res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch("/orders/:_id/complete", auth, async (req, res) => {
  const {
    user,
    params: { _id }
  } = req;

  try {
    const order = await Order.findOne({ _id });
    await Order.checkOrderExistance(order);

    if (order.completed) {
      throw new Error("The order had been already completed");
    }
    //const { date, time } = order;
    //const scheduledDateTime = convertDateTimeToISO({ date, time });

    user.cleans = user.cleans + 1;
    await user.save();

    order.completed = true;
    await order.save();

    res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
