module.exports = {
  customer: [
    /* {endpoint: "/users/signup", method: "POST"}, */
    "/users/signup",
    "/users/me",
    "/users/signout",
    "/reviews/:_id/create",
    "/users/me/profile-data",
    "/users/me/account-data",
    "/users/me/avatar",
    "/orders",
    "/orders/:_id",
    "/subscribe",
    "/unsubscribe",
    "/subscription/exists"
  ],
  company: [
    "/users/signup",
    "/users/me",
    "/users/signout",
    "/users/me/profile-data",
    "/users/me/account-data",
    "/users/me/services",
    "/users/me/avatar",
    "/users/:id/avatar",
    "/orders",
    "/orders/:_id",
    "/orders/:_id/approve",
    "/orders/:_id/deny",
    "/orders/:_id/complete"
  ]
};
