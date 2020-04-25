const { Course } = require("../models");

module.exports = function(router) {
    const courseRoute = router.route("/courses");
  
    // get all courses
    courseRoute.get(async (req, res) => {
      const courses = await Course.find({});
      res.status(200).send({
        message: "Successfully retrieved all courses.",
        data: courses
      });
    });
  
    // create a Course
    courseRoute.post(async (req, res) => {
      const { name, subject, number, rooms } = req.body;
      //console.log(req.body);
      const newCourse = new Course({
        name,
        subject,
        number,
        rooms
      });
      await newCourse.save();
      res.status(200).send({
        message: "Successfully created new course."
      });
    });
    return router;
  };