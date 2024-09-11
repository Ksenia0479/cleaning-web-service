const cron = require("node-cron");
const webpush = require("web-push");
const _ = require("lodash");

// utils
const convertDateTimeToISO = require("./utils/converDateTimeToISO");

webpush.setGCMAPIKey = "AIzaSyBUw0gCuKO45zOabkEl8ymcg-_L0qVLPIc";
webpush.setVapidDetails(
  "mailto:kseniyachervonaya@gmail.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

const User = require("./models/Users");
const Subscriber = require("./models/Subscribers");

const pushService = cron.schedule("*/60 * * * * *", async () => {
  const currentDate = Date.now();

  const subscribers = await Subscriber.find({});

  _.map(subscribers, async ({ subscriber, endpoint, keys }) => {
    const user = await User.findOne({ _id: subscriber, isAuthorized: true });

    if (user) {
      await user.populate({ path: "orders" }).execPopulate();

      _.map(user.orders, async order => {
        let {
          date,
          time,
          processed: { status },
          isNotificationPushed,
          _id,
          orderNumber
        } = order;

        const scheduledDate = convertDateTimeToISO({ date, time });

        if (
          scheduledDate - currentDate >= process.env.NOTIFY_IN &&
          !isNotificationPushed &&
          status === "approved"
        ) {
          const payload = JSON.stringify({
            image: "",
            title: `Order Number: #${orderNumber}`,
            text: "Cleaning service will be arrived in 2 hours",
            url: `${process.env.HOST}/orders/future?id=${_id}`
          });
          webpush.sendNotification({ endpoint, keys }, payload).catch(err => {
            console.error(err.stack);
          });
          order.isNotificationPushed = true;
          await order.save();
        }
      });
    }
  });
});

module.exports = {
  pushService
};
