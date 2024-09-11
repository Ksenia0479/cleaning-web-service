const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;
const playground = process.env.PLAYGROUND_URL;

const sendMail = async (mailOptions) => {
  const oauth2Client = new OAuth2(clientID, clientSecret, playground);

  await oauth2Client.setCredentials({ refresh_token });

  const accessToken = await oauth2Client.getAccessToken().then((response) => {
    return response.token;
  });

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_SENDER,
      clientID,
      clientSecret,
      refresh_token,
      accessToken,
    },
  });

  await smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? error : response;
    smtpTransport.close();
  });
};

module.exports = sendMail;
