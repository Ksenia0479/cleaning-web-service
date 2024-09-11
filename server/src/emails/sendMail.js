const sendMail = require("./auth");

const sendWelcomeEmail = (to, verificationURL) => {
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to,
    subject: "Confirm your account on Cleaning App",
    generateTextFromHTML: true,
    html: `<div>Thanks for signing up with Cleaning App! You must follow this link to activate your account:</div><br>
       <div><a href=${verificationURL}>${verificationURL}</a></div><br>
       <div>Have fun, and don't hesitate to contact us with your feedback</div><br>
       <div>The Cleaning App team</div><br>`,
  };
  sendMail(mailOptions);
};

const sendCancellationEmail = (to) => {
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to,
    subject: "Your Account is closed",
    generateTextFromHTML: true,
    html: `<div>We’re sorry to see you go :(</div>
    <div>Your subscription has been cancelled.</div>
    <div>Thanks again for trying Cleaning App!</div>
    <div>Cleaning App Team</div>
    </div><br>`,
  };
  sendMail(mailOptions);
};

const sendReviewNotificationEmail = (to, companyName, review) => {
  const {
    rating,
    review: { header, description },
  } = review;

  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to,
    subject: `You got ${rating}-star review!`,
    generateTextFromHTML: true,
    html: `<div>Hello, ${companyName} </div>
    <br>
    <b>${header}</b>
    <div>${description}</div>
    <br>`,
  };
  sendMail(mailOptions);
};

const sendBookingNotificationEmail = (to, companyName, bookingInfoURL) => {
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to,
    subject: "New Order Arrived!",
    generateTextFromHTML: true,
    html: `<div>Hi, ${companyName} </div>
    <br>
    <div>You've got a new order</div>
    <br>
    <div>To check more information about it, please follow the link: ${bookingInfoURL} </div>
    `,
  };
  sendMail(mailOptions);
};

const sendApprovedOrderEmail = ({
  to,
  name: { firstName = "", lastName = "" },
  orderURL,
  orderNumber,
}) => {
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to,
    subject: `The Order #${orderNumber} Successfully Approved!`,
    generateTextFromHTML: true,
    html: `<div>Dear ${firstName} ${lastName}, </div>
    <br>
    <div>Thank you for your order!</div>
    <br>
    <div>Your order #${orderNumber} has been successfully approved</div>
    <br>
    <div>To check more information about your order, please follow the link: ${orderURL} </div>
  `,
  };
  sendMail(mailOptions);
};

const sendDeniedOrderEmail = ({
  to,
  creatorName: { firstName = "", lastName = "" },
  companyName,
  message,
  orderNumber,
}) => {
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to,
    subject: `The Order #${orderNumber} has beed denied!`,
    generateTextFromHTML: true,
    html: `<div>Dear ${firstName} ${lastName}, </div>
    <br>
    <div>Unfortunately, but ${companyName} company has denied your order - #${orderNumber}</div>
    <br>
    <b>Message from ${companyName}:</b>
    <br>
    <div>${message}</div>
    `,
  };
  sendMail(mailOptions);
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
  sendReviewNotificationEmail,
  sendBookingNotificationEmail,
  sendApprovedOrderEmail,
  sendDeniedOrderEmail,
};
