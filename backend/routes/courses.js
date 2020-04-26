const { Course } = require("../models");

module.exports = function(router) {
  // routes
  const coursesRoute = router.route("/courses");
  const courseRoute = router.route("/courses/:id");

  // constants
  const SUCCESS = 200;
  const NOT_FOUND = 404;
  const SERVER_ERR = 500;

  //get single course -->
  courseRoute.get(async (req, res) => {
    const { id } = req.params;
    try {
      const course = await Course.findById(id);
      if (!course) {
        res.status(NOT_FOUND).send({
          message: "Course not found."
        });
      }
      res.status(SUCCESS).send({
        message: "Course successfully retrieved.",
        data: course
      });
    } catch (err) {
      res.status(SERVER_ERR).send({
        message: "Internal server error."
      });
    }
  });

  // get all courses
  coursesRoute.get(async (req, res) => {
    const courses = await Course.find({});
    res.status(SUCCESS).send({
      message: "Successfully retrieved all courses.",
      data: courses
    });
  });

  // create a Course
  coursesRoute.post(async (req, res) => {
    const { name, subject, number, rooms } = req.body;
    //console.log(req.body);
    const newCourse = new Course({
      name,
      subject,
      number,
      rooms
    });
    await newCourse.save();
    res.status(SUCCESS).send({
      message: "Successfully created new course."
    });
  });

  return router;
};
