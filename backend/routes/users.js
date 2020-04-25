const { User } = require("../models");

module.exports = function(router) {
  const usersRoute = router.route("/users");
  const userRoute = router.route("/users/:id");

  // get all Users
  usersRoute.get(async (req, res) => {
    const users = await User.find({});
    res.status(200).send({
      message: "Successfully retrieved all users.",
      data: users
    });
  });

  // create a User
  usersRoute.post(async (req, res) => {
    const { name, email, password, school, admin } = req.body;
    const newUser = new User({
      name,
      email,
      password,
      school,
      admin
    });
    await newUser.save();
    res.status(200).send({
      message: "Successfully created new user."
    });
  });
  return router;
};
