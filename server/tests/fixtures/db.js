const mongoose = require("mongoose");
const User = require("../../src/models/user");

const userOneId = mongoose.Types.ObjectId();
const hashedUserOnePassword = "wWWYT1112!";
const userOne = {
  _id: userOneId,
  firstName: "userOne",
  lastName: "userOne",
  contact: { email_address: "test@text.com" },
  password: hashedUserOnePassword
};

const userTwoId = mongoose.Types.ObjectId();
const hashedUserTwoPassword = "LqFB41112!";
const userTwo = {
  _id: userTwoId,
  firstName: "userTwo",
  lastName: "userTwo",
  contact: { phone_number: "80296263059" },
  password: hashedUserTwoPassword
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
};

module.exports = { setupDatabase };
