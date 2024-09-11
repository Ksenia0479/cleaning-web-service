const express = require("express");
const router = express.Router();
const webpush = require("web-push");

// middleware
const auth = require("../middleware/auth");

// models
const Subscriber = require("../models/Subscribers");

// webpush
webpush.setGCMAPIKey = process.env.GCM_API_KEY;
webpush.setVapidDetails(
  `mailto:${process.env.MAIL_RECEIVER}`,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

router.post("/subscribe", auth, async (req, res) => {
  try {
    const {
      body: { endpoint, keys },
      user
    } = req;

    const subscriber = await new Subscriber({
      subscriber: user._id,
      endpoint,
      keys
    });

    await subscriber.checkSubscriberExistance();

    user.enableNotifications = true;

    await user.save();
    await subscriber.save();

    const isUserSubscribed = true;

    res.status(201).send({ isUserSubscribed });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/unsubscribe", auth, async (req, res) => {
  const { user } = req;

  try {
    const subscription = await Subscriber.findOne({ subscriber: user._id });
    await subscription.delete();

    user.enableNotifications = false;
    await user.save();

    const isUserSubscribed = false;

    res.status(200).send({ isUserSubscribed });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/subscription/exists", auth, async (req, res) => {
  try {
    const {
      user: { _id }
    } = req;

    let subscription = await Subscriber.findOne({ subscriber: _id });

    const isUserSubscribed = subscription ? true : false;

    res.status(200).send({ isUserSubscribed });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
