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

  //get specific User
  userRoute.get(async(req,res) => {
    let id = req.params.id;
    const user = await User.findOne({_id: id});
    let name = user.name;
    res.status(200).send({
      message: "Successfully retrieved ",
      data: users
    })
  })

  // create a User
  usersRoute.post(async (req, res) => {
    const { name, email, school, admin, courses } = req.body;
    const newUser = new User({
      name,
      email,
      school,
      admin,
      courses
    });
    await newUser.save();
    res.status(200).send({
      message: "Successfully created new user."
    });
  });
  return router;
};
