const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const _ = require("lodash");

// models
const Subscriber = require("../models/Subscribers");
const User = require("../models/Users");
const Order = require("../models/Orders");

// middleware
const defineRole = require("../middleware/defineRole");
const upload = require("../middleware/uploadFile");
const auth = require("../middleware/auth");

// emails
const { sendCancellationEmail } = require("../emails/sendMail");

router.post(
  "/users/signup",
  upload.single("avatar"),
  defineRole,
  async (req, res) => {
    const { user } = req;
    const { host } = req.headers;

    try {
      await user.checkUserExistenceByCredentials();

      const { token } = user.generateAuthToken();
      user.tokens = _.concat(user.tokens, { token });
      await user.save();

      await user.sendWelcomeEmail({ host, token });

      //res.header("x-auth-header", token).send({ user });
      res.status(201).send({ user, token });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

router.post("/users/signup/identify", async (req, res) => {
  let { contact } = req.body;
  const { host } = req.headers;

  try {
    contact = await User.defineContactType(contact);
    const user = await User.findOne({ contact });

    await User.checkDataExistence(user);

    const { token } = user.generateAuthToken();
    user.tokens = _.concat(user.tokens, { token });
    await user.save();

    await user.sendWelcomeEmail({ host, token });

    res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/token", async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const {
      user: { _id, role }
    } = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET_KEY);

    const user = await User.findOne({ role, _id });
    await User.checkDataExistence(user);

    const tokens = await user.generateAuthToken();
    user.filterTokens(refreshToken);
    user.concatenateTokens(tokens);
    await user.save();

    res.status(200).send(tokens);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/users/signup", auth, async (req, res) => {
  const { user } = req;

  try {
    if (user.isVerified) {
      throw new Error("This user has been already verified");
    }
    user.isVerified = true;
    await user.save();

    res.redirect(`${process.env.HOST}/signin`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/users/signin", async (req, res) => {
  let { contact, password } = req.body;

  try {
    User.checkCredentialExistence({ contact, password });

    const user = await User.findByCredentials(contact, password);
    await user.checkUserVerification();

    const tokens = await user.generateAuthToken();
    user.concatenateTokens(tokens);

    user.isAuthorized = true;
    await user.save();

    const { role } = user;
    res.status(200).send({ user: { role }, tokens });
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.post("/users/signout", auth, async (req, res) => {
  const { user, token } = req;
  try {
    user.tokens = _.filter(user.tokens, { token });
    user.isAuthorized = false;
    await user.save();

    res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/users/me/avatar", auth, async (req, res) => {
  const {
    user: { avatar }
  } = req;
  try {
    if (!avatar) {
      return res.status(200).send("");
    }

    const avatarBase64 = User.convertToBase64(avatar);
    res.status(200).send(avatarBase64);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const { file, user } = req;

    try {
      if (!file) {
        throw new Error("Please upload new avatar you would like to have");
      }

      user.avatar = await User.modifyAvatar(file.buffer);
      await user.save();

      const avatarBase64 = User.convertToBase64(user.avatar);

      res.send(avatarBase64);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

router.get("/users/me/services", auth, async (req, res) => {
  const {
    user: { services, rooms }
  } = req;
  try {
    User.checkDataExistence(services);
    User.checkDataExistence(rooms);

    res.send({ rooms, services });
  } catch (err) {
    res.status().send(err.message);
  }
});

router.put("/users/me/services", auth, async (req, res) => {
  const { user } = req;
  const { rooms, services } = req.body;

  try {
    await user.updateUserData({ rooms, services });
    await user.save();

    res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch("/users/me/account-data", auth, async (req, res) => {
  const {
    user,
    body: { currentPassword, password }
  } = req;
  try {
    await user.comparePasswords(currentPassword);
    user.password = password;
    await user.save();

    res.status(200).send();
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get("/users/me/profile-data", auth, async (req, res) => {
  const { user } = req;

  try {
    const profiledata = await user.getProfileData();

    res.status(200).send(profiledata);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch("/users/me/profile-data", auth, async (req, res) => {
  const { data } = req.body;
  const { user } = req;

  try {
    await user.updateUserData(data);
    await user.save();

    res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/users/me/account-data", auth, async (req, res) => {
  const { contact } = req.user;
  try {
    res.status(200).send({ contact });
  } catch (err) {
    res.status(404).send(err);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  const {
    contact: { email_address },
    _id
  } = req.user;
  try {
    User.checkDataExistence(email_address);
    await sendCancellationEmail(email_address);

    await Subscriber.deleteOne({ subscriber: _id });
    await Order.deleteMany({ "creator._id": _id });
    await req.user.delete();

    res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/companies", async (req, res) => {
  const propsToBePicked = [
    "companyName",
    "createdAt",
    "services",
    "address",
    "reviews",
    "avatar",
    "rating",
    "cleans",
    "price",
    "rooms",
    "_id"
  ];

  const { services, rooms } = req.body;

  try {
    let companies = await User.find({ role: "company", isVerified: true });
    User.checkDataExistence(companies);

    companies = User.filterCompaniesByServicesAndRooms(companies, {
      services,
      rooms
    });

    rooms && services && User.calculatePrice(companies, { rooms, services });

    companies = await Promise.all(
      _.map(companies, async company => {
        company.cleans = await User.getCompanyTotalCleans(company);

        company = _.pick(company, propsToBePicked);

        let { avatar } = company;
        if (avatar) {
          company.avatar = User.convertToBase64(avatar);
        }
        return company;
      })
    );

    res.status(200).send(companies);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/companies/:_id", async (req, res) => {
  const { _id } = req.params;
  const propsToBePicked = [
    "avatar",
    "companyName",
    "companyDescription",
    "address",
    "services",
    "rooms",
    "pricePointes",
    "reviews",
    "rating"
  ];

  try {
    const company = await User.findOne({ _id });
    User.checkDataExistence(company);

    let filteredCompany = _.pick(company, propsToBePicked);
    let { avatar } = filteredCompany;

    if (avatar) {
      avatar = User.convertToBase64(avatar);
    }

    res.status(200).send(filteredCompany);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/reviews/:_id/create", auth, async (req, res) => {
  const {
    user: { _id, firstName, lastName }
  } = req;
  const { _id: companyId } = req.params;
  const { review } = req.body;

  try {
    const company = await User.findOne({ _id: companyId });
    User.checkDataExistence(company);

    company.rating = Math.round((company.rating + review.rating) / 2);
    company.reviews = _.concat(company.reviews, {
      ...review,
      creator: {
        _id,
        firstName,
        lastName
      }
    });
    await company.save();

    company.sendReviewNotificationEmail();

    res.status(201).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/companies/:_id/reviews", async (req, res) => {
  const propsToBePicked = ["reviews"];
  const { _id } = req.params;
  try {
    const company = await User.findOne({ _id });
    User.checkDataExistence(company);

    const { reviews } = _.pick(company, propsToBePicked);

    res.status(200).send(reviews);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
