const { User } = require("../models");
const { Course } = require("../models");

module.exports = function(router) {
  // routes
  const usersRoute = router.route("/users");
  const userRoute = router.route("/users/:id");
  const userCourseRoute = router.route("/users/:id/courses");

  // constants
  const SUCCESS = 200;
  const NOT_FOUND = 404;
  const SERVER_ERR = 500;

  // get all Users
  usersRoute.get(async (req, res) => {
    const users = await User.find({});
    res.status(SUCCESS).send({
      message: "Successfully retrieved all users.",
      data: users
    });
  });

  //get specific User
  userRoute.get(async (req, res) => {
    let id = req.params.id;
    const user = await User.findOne({ _id: id })
      .then(user =>
        user !== null ? res.send(user) : res.sendStatus(NOT_FOUND)
      )
      .catch(() => res.sendStatus(SERVER_ERR));
    res.status(SUCCESS).send({
      message: `${user.name} Successfully retrieved`,
      data: users
    });
  });

  //delete specific User
  userRoute.delete(async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findByIdAndRemove(userId);
      if (!user) {
        res.status(NOT_FOUND).send({
          message: "User not found."
        });
      }
      res.status(SUCCESS).send({
        message: "User deleted successfully."
      });
    } catch (err) {
      res.status(SERVER_ERR).send({
        message: "Internal server error."
      });
    }
  });

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
    try {
      const user = await newUser.save();
      if (!user) {
        res.status(NOT_FOUND).send({
          message: "User not found."
        });
      }
      res.status(SUCCESS).send({
        message: "Successfully created new user."
      });
    } catch (err) {
      res.status(SERVER_ERR).send({
        message: "Internal server error."
      });
    }
  });

  //update a user
  userRoute.put(async (req, res) => {
    const { id } = req.params;
    const { name, email, school } = req.body;
    const fieldsToUpdate = {};
    if (name) {
      fieldsToUpdate["name"] = name;
    }
    if (email) {
      fieldsToUpdate["email"] = email;
    }
    if (school) {
      fieldsToUpdate["school"] = school;
    }
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { $set: fieldsToUpdate },
        { new: true }
      );
      if (!user) {
        res.status(NOT_FOUND).send({
          message: "User not found."
        });
      }
      res.status(SUCCESS).send({
        message: "User updated successfully."
      });
    } catch (err) {
      res.status(SERVER_ERR).send({
        message: "Internal server error."
      });
    }
  });

  // get all User's Courses
  userCourseRoute.get(async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        res.status(NOT_FOUND).send({
          message: "User not found."
        });
      }
      res.status(SUCCESS).send({
        message: "Retrieved user's courses.",
        data: user.courses
      });
    } catch (err) {
      res.status(SERVER_ERR).send({
        message: "Internal server error."
      });
    }
  });

  // add Course to User's Courses
  userCourseRoute.put(async (req, res) => {
    const { id } = req.params;
    const { courseToAdd } = req.body;
    try {
      const course = await Course.findById(courseToAdd);
      if (!course) {
        res.status(NOT_FOUND).send({
          message: "Course not found."
        });
      }
      const user = await User.findByIdAndUpdate(
        id,
        { $push: { courses: courseToAdd } },
        { new: true }
      );
      if (!user) {
        res.status(NOT_FOUND).send({
          message: "User not found."
        });
      }
      res.status(SUCCESS).send({
        message: "Added course to user's courses."
      });
    } catch (err) {
      res.status(SERVER_ERR).send({
        message: "Internal server error."
      });
    }
  });

  userCourseRoute.delete(async (req, res) => {
    const { id } = req.params;
    const { courseToRemove } = req.body;
    try {
      const course = await Course.findById(courseToRemove);
      if (!course) {
        res.status(NOT_FOUND).send({
          message: "Course not found."
        });
      }
      const user = await User.findByIdAndUpdate(
        id,
        { $pull: { courses: courseToRemove } },
        { new: true }
      );
      if (!user) {
        res.status(NOT_FOUND).send({
          message: "User not found."
        });
      }
      res.status(SUCCESS).send({
        message: "Removed course from user's courses."
      });
    } catch (err) {
      console.log(err);
      res.status(SERVER_ERR).send({
        message: "Internal server error."
      });
    }
  });

  return router;
};
