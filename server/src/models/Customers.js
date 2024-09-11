const mongoose = require("mongoose");

// models
const User = require("./Users");

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  enableNotifications: { type: Boolean }
});

customerSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "creator._id"
});

const Customer = User.discriminator("Customer", customerSchema);

module.exports = Customer;
