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
    const user = await User.findOne({_id: id})
    .then(user => (user !== null ? res.send(user) : res.sendStatus(404)))
    .catch(() => res.sendStatus(500));;
    res.status(200).send({
      message: `${user.name} Successfully retrieved`,
      data: users
    })
  });

  //delete specific User
  userRoute.delete(
    (async (req, res) => {
      const userId = req.params.id;
      const user = await User.findByIdAndRemove(userId);
      const ret = user
        ? {
            code: 200,
            message: "User deleted successfully",
            success: true,
          }
        : {
            code: 404,
            message: "User not found",
            success: false,
          };
      res.status(ret.code).json(ret);
    })
  );

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

  //update a user
  userRoute.put(async(req, res) => {
      const id = req.params.id;
      const user = await User.findByIdAndUpdate(id, req.body);
      const ret = user
        ? {
            code: 200,
            message: "User updated successfully",
            success: true,
          }
        : {
            code: 404,
            message: "User not found",
            success: false,
          };
      res.status(ret.code).json(ret);
    }
  );
  return router;
};

  
  
