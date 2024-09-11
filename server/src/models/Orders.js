const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

// models
const User = require("../models/Users");

// emails
const {
  sendApprovedOrderEmail,
  sendDeniedOrderEmail
} = require("../emails/sendMail");

const orderOptions = { timestamps: true };

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true },
    processed: {
      status: { type: String, required: true, default: "pending" },
      message: { type: String }
    },
    completed: { type: Boolean, required: true, default: false },
    creator: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer"
      },
      name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
      },
      contact: {
        email_address: {
          type: String,
          lowercase: true,
          trim: true,
          validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Email is invalid");
            }
            if (validator.isEmpty(value)) {
              throw new Error("Email can not be blank");
            }
          }
        },
        phone_number: {
          type: String
        }
      }
    },
    services: {
      type: { type: String, required: true },
      value: { type: Number, required: true },
      label: { type: String }
    },
    rooms: {
      small: {
        label: { type: String },
        value: { type: Number, required: true }
      },
      large: {
        label: { type: String },
        value: { type: Number, required: true }
      },
      bath: {
        label: { type: String },
        value: { type: Number, required: true }
      }
    },
    frequency: {
      label: { type: String },
      value: { type: Boolean, required: true }
    },
    price: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    address: {
      street: { type: String },
      apartmentNumber: { type: String },
      city: { type: String },
      zipCode: { type: Number }
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company"
    },
    isNotificationPushed: {
      type: Boolean,
      default: false
    }
  },
  orderOptions
);

orderSchema.statics.generateOrderNumber = () => {
  let unixTime = Date.now().toString();
  unixTime += Math.floor(Math.random() * 10);

  return [
    unixTime.slice(0, 4),
    unixTime.slice(4, 10),
    unixTime.slice(10, 14)
  ].join("-");
};

orderSchema.statics.checkOrderExistance = order => {
  if (!order) {
    throw new Error("The order doesn't exist in the database");
  }
};

orderSchema.methods.sendApprovedOrderEmail = async function({ host }) {
  const {
    creator: { contact, name, _id },
    orderNumber
  } = this;

  const user = await User.findById({ _id });

  User.checkUserExistance(user);

  const { token } = user.generateAuthToken();

  user.tokens = _.concat(user.tokens, { token });
  await user.save();

  if (contact.email_address) {
    const orderURL = `${process.env.HOST}/orders?token=${token}`;

    const emailParams = {
      to: contact.email_address,
      name,
      orderURL,
      orderNumber
    };

    await sendApprovedOrderEmail(emailParams);
  }
};

orderSchema.methods.sendDeniedOrderEmail = async function({
  host,
  companyName,
  message
}) {
  const {
    _id,
    creator: {
      contact: { email_address },
      name
    },
    orderNumber
  } = this;

  if (email_address) {
    const orderURL = `http://${host}/orders/future/${_id}}`;

    const emailParams = {
      to: email_address,
      creatorName: name,
      companyName,
      orderNumber,
      message,
      orderURL
    };

    await sendDeniedOrderEmail(emailParams);
  }
};

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
