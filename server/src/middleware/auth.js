const jwt = require("jsonwebtoken");
const _ = require("lodash");

// models
const User = require("../models/Users");

// utils
const roles = require("../utils/rolePermission");

const Auth = async (req, res, next) => {
  const token = req.headers.authorization || req.query.token;

  try {
    if (!token) {
      throw new Error("Please authenticate");
    }

    const {
      user: { _id, role }
    } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({ _id, "tokens.token": token });

    if (!user) {
      throw new Error("User not found");
    }

    const isPermitted = _.find(roles[role], url => {
      return url === req.route.path;
    });

    if (isPermitted) {
      req.user = user;
      req.token = token;
      next();
    } else {
      res
        .status(403)
        .send(
          "Access denied: You don't have a permission to perform this operation"
        );
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = Auth;
