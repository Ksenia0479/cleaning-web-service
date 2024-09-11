// models
const User = require("../models/Users");
const Company = require("../models/Companies");
const Customer = require("../models/Customers");

const defineRole = async (req, res, next) => {
  const { role } = req.body;

  try {
    let user;

    if (role === "customer") {
      let { firstName, lastName, contact, password, role } = req.body;

      contact = await User.defineContactType(contact);

      user = await new Customer({
        firstName,
        lastName,
        contact,
        password,
        role
      });
    }
    if (role === "company") {
      let avatar;
      if (req.file) {
        avatar = req.file.buffer;
        avatar = await User.modifyAvatar(avatar);
      }

      let {
        companyName,
        contact,
        services,
        address,
        rooms,
        password,
        role
      } = req.body;

      contact = await Customer.defineContactType(contact);

      const parsedRooms = JSON.parse(rooms);
      const parsedServices = JSON.parse(services);
      const parsedAddress = JSON.parse(address);

      user = await new Company({
        companyName,
        contact,
        avatar,
        address: parsedAddress,
        services: parsedServices,
        rooms: parsedRooms,
        password,
        role
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = defineRole;
