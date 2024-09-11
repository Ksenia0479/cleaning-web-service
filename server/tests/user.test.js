const request = require("supertest");
const app = require("../app");
const User = require("../src/models/user");

const { setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should sign up a new user by email address", async () => {
  const response = await request(app)
    .post("/users/create")
    .send({
      firstName: "Alex",
      lastName: "Chervonaya",
      contact: "80296263050",
      password: "LqFB41112!"
    })
    .expect(201);

  // Assert the user is successfully added to the database
  const user = await User.findById({ _id: response.body.user._id });
  expect(user).not.toBeNull();

  //Assert the password is hashed successfully
  expect(user.password).not.toBe("LqFB41112!");
});

test("Should sign up a new user by phone number", async () => {
  const response = await request(app)
    .post("/users/create")
    .send({
      firstName: "Alex",
      lastName: "Zapotylok",
      contact: "al2ex@bam-boo.eu",
      password: "LqFB41112!"
    })
    .expect(201);

  // Assert the user is successfully added to the database
  const user = await User.findById({ _id: response.body.user._id });
  expect(user).not.toBeNull();

  //Assert the password is hashed successfully
  expect(user.password).not.toBe("LqFB41112!");
});
