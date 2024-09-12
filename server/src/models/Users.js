const mongoose = require("../db/mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sharp = require("sharp");
const _ = require("lodash");

const {
  sendWelcomeEmail,
  sendBookingNotificationEmail,
  sendReviewNotificationEmail,
} = require("../emails/sendMail");

const userOptions = {
  discriminatorKey: "__role",
  collection: "user",
  timestamps: true,
};

const userSchema = new mongoose.Schema(
  {
    contact: {
      email_address: {
        type: String,
        sparse: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Email is invalid");
          }
          if (validator.isEmpty(value)) {
            throw new Error("Email can not be blank");
          }
        },
      },
      phone_number: {
        type: String,
        sparse: true,
        unique: true,
      },
    },
    avatar: {
      type: Buffer,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value === "password") {
          throw new Error(
            "It's forbitten to use password combination like password"
          );
        }
      },
    },
    address: {
      street: { type: String },
      apartmentNumber: { type: String },
      city: { type: String },
      zipCode: { type: Number },
    },
    tokens: [
      {
        token: { type: String, required: true },
        refreshToken: { type: String },
      },
    ],
    role: { type: String, default: "customer" },
    isVerified: { type: Boolean, default: false },
    isAuthorized: { type: Boolean, default: false, required: true },
  },
  userOptions
);

userSchema.pre("save", async function (next) {
  const user = this;

  // todo: BCRYPT_SALT_ROUNDS=8
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.isVerified;
  delete userObject.avatar;
  delete userObject.__v;
  delete userObject.__role;

  return userObject;
};

userSchema.methods.checkUserExistenceByCredentials = async function () {
  const { contact } = this;

  const isUserExists = await User.findOne({ contact });

  if (isUserExists) {
    throw new Error(
      "Someone already has the account with this contact info. Please try with another one"
    );
  }
};

userSchema.statics.checkCredentialExistence = ({ contact, password }) => {
  if (!contact || !password) {
    throw new Error(
      "Please enter email address/phone number and password combination to be authorized"
    );
  }
};

userSchema.methods.generateAuthToken = function () {
  const { _id, role } = this;

  const token = jwt.sign({ user: { _id, role } }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(
    { user: { _id, role } },
    process.env.REFRESH_JWT_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    }
  );

  return { token, refreshToken };
};

userSchema.methods.comparePasswords = async function (password) {
  const user = this;

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("The password you've entered is incorrect.");
  }
};

userSchema.methods.getProfileData = function () {
  const user = this;

  const allowedProperties = {
    company: [
      "companyName",
      "companyDescription",
      "services",
      "pricePoints",
      "address",
    ],
    customer: [
      "firstName",
      "lastName",
      "enableNotifications",
      "address",
      "contact",
    ],
  };

  return _.pick(user, allowedProperties[user.role]);
};

userSchema.methods.updateUserData = function (data) {
  const user = this;

  _.mapKeys(data, function (propValue, propKey) {
    user[propKey] = propValue;
  });
};

userSchema.methods.checkUserVerification = async function () {
  const user = this;

  const { token } = _.head(user.tokens);
  if (!user.isVerified) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err) => {
      if (err) {
        await user.delete();
        throw new Error(
          "The email or phone number you've entered doesn't match any account. Please sign up for an account."
        );
      }
    });
    throw new Error(
      "Please confirm your registration by email before to be authenticated"
    );
  }
};

userSchema.statics.defineContactType = (contact) => {
  if (validator.isEmail(contact)) {
    return { email_address: contact };
  } else {
    return { phone_number: contact };
  }
};

userSchema.statics.findByCredentials = async (contact, password) => {
  const user = await User.findOne({
    contact: { email_address: contact },
  });

  if (!user) {
    throw new Error(
      "The email or phone number you've entered doesn't match any account. Please sign up for an account."
    );
  }

  await user.comparePasswords(password);

  return user;
};

userSchema.statics.modifyAvatar = async (avatar) => {
  const modifiedAvatar = await sharp(avatar)
    .resize({ width: 200, height: 200 })
    .png()
    .toBuffer();
  return modifiedAvatar;
};

userSchema.statics.getCompanyTotalCleans = async (company) => {
  await company.populate({ path: "orders" });
  const cleans = _.filter(company.orders, { completed: true });
  return cleans.length;
};

userSchema.statics.defineUserId = async (token) => {
  if (token) {
    const {
      user: { _id },
    } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    return _id;
  } else {
    return await mongoose.Types.ObjectId();
  }
};

userSchema.methods.sendWelcomeEmail = async function ({ host, token }) {
  const { contact } = this;

  if (contact.email_address) {
    const verificationURL = `http://${host}/users/signup?token=${token}`;
    const mailReceiver = contact.email_address;
    await sendWelcomeEmail(mailReceiver, verificationURL);
  }
};

// TODO
userSchema.statics.sendBookingNotificationEmail = async ({
  _id,
  host,
  assignee,
}) => {
  const user = await User.findById({ _id: assignee });

  const { token } = user.generateAuthToken();

  user.tokens = user.tokens.concat({ token });
  await user.save();

  if (user.contact.email_address) {
    const {
      contact: { email_address },
      companyName,
    } = user;

    const bookingInfoURL = `http://${host}/orders/${_id}/${generatedToken}`;

    await sendBookingNotificationEmail(
      email_address,
      companyName,
      bookingInfoURL
    );
  }
};

userSchema.methods.sendReviewNotificationEmail = async function () {
  const {
    contact: { email_address },
    companyName,
    reviews,
  } = this;

  if (user.contact.email_address) {
    await sendReviewNotificationEmail(
      email_address,
      companyName,
      _.last(reviews)
    );
  }
};

userSchema.statics.checkDataExistence = (data) => {
  if (!data) {
    throw new Error("The requested data doesn't exist in the database");
  }
};

userSchema.methods.concatenateTokens = async function (tokens) {
  const user = this;

  user.tokens = _.concat(user.tokens, tokens);
};

userSchema.methods.filterTokens = async function (refreshToken) {
  const user = this;

  user.tokens = _.filter(user.tokens, { refreshToken: refreshToken });
};

userSchema.statics.convertToBase64 = (data) => {
  const base64Flag = "data:image/jpeg;base64,";
  return `${base64Flag}${data.toString("base64")}`;
};

userSchema.statics.filterCompaniesByServicesAndRooms = (
  companies,
  { services, rooms }
) => {
  if (!services || !rooms) {
    return companies;
  }

  const filteredRooms = _.reduce(
    rooms,
    (result, value, key) => {
      if (value.value) {
        result[key] = value;
      }
      return result;
    },
    {}
  );

  return _.filter(companies, (company) => {
    return (
      _.some(company.services, {
        type: services.type,
      }) &&
      _.every(filteredRooms, (value, prop) => {
        return _.find(company.rooms, { type: prop });
      })
    );
  });
};

userSchema.statics.calculatePrice = (companies, { rooms, services }) => {
  _.map(companies, (company) => {
    const pickedCompanyService = _.find(company.services, {
      type: services.type,
    });

    const priceByNumberOfRooms = _.sum(
      _.map(company.rooms, ({ type, value }) => {
        return (
          rooms[type] && rooms[type]["value"] && rooms[type]["value"] * value
        );
      })
    );

    const price = pickedCompanyService.value * priceByNumberOfRooms;

    company.price = price;
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
