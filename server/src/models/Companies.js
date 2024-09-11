const mongoose = require("mongoose");

// models
const User = require("./Users");

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyDescription: { type: String },
  services: [
    {
      type: { type: String, required: true },
      value: { type: Number, required: true },
      label: { type: String }
    }
  ],
  rooms: [
    {
      type: { type: String, required: true },
      value: { type: Number, required: true },
      label: { type: String }
    }
  ],
  reviews: [
    {
      review: {
        header: { type: String, required: true },
        description: { type: String, required: true }
      },
      rating: { type: Number, required: true },
      creator: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Customer"
        },
        firstName: { type: String },
        lastName: { type: String }
      },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  rating: { type: Number, default: 0 },
  cleans: { type: Number, default: 0 }
});

companySchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "assignee"
});

const Company = User.discriminator("Company", companySchema);

module.exports = Company;
