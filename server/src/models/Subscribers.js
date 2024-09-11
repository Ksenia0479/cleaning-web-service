const mongoose = require("mongoose");

const subscriberOptions = {
  timestamps: true
};

const subscriberSchema = new mongoose.Schema(
  {
    endpoint: String,
    keys: mongoose.Schema.Types.Mixed,
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  subscriberOptions
);

subscriberSchema.methods.checkSubscriberExistance = async function() {
  const { subscriber } = this;

  const isSubscriberExists = await Subscriber.findOne({ subscriber });

  if (isSubscriberExists) {
    throw new Error(
      "Someone already has the subscription with these credentials"
    );
  }
};

const Subscriber = mongoose.model("subscribers", subscriberSchema);

module.exports = Subscriber;
