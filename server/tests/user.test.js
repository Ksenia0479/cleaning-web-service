const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const { setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should sign up a new user by email address", async () => {
  const response = await request(app)
    .post("/users/create")
    .send({
      firstName: "Alex",
      lastName: "Smith",
      contact: "4865674",
      password: "qweasdzxc123!",
    })
    .expect(201);

  // Assert the user is successfully added to the database
  const user = await User.findById({ _id: response.body.user._id });
  expect(user).not.toBeNull();

  //Assert the password is hashed successfully
  expect(user.password).not.toBe("qweasdzxc123!");
});

test("Should sign up a new user by phone number", async () => {
  const response = await request(app)
    .post("/users/create")
    .send({
      firstName: "Alex",
      lastName: "Smith",
      contact: "al2ex@gmail.com",
      password: "qweasdzxc123!",
    })
    .expect(201);

  // Assert the user is successfully added to the database
  const user = await User.findById({ _id: response.body.user._id });
  expect(user).not.toBeNull();

  //Assert the password is hashed successfully
  expect(user.password).not.toBe("qweasdzxc123!");
});
