const { Course } = require("../models");

module.exports = function(router) {
    const coursesRoute = router.route("/courses");
    const courseRoute = router.route("/courses/:id");
    const course = router.route('/courses/many');

    //get single course --> 
    courseRoute.get(
        (async (req, res) => {
          const courseid = req.params.id.toUpperCase().split("_");
          const coursesubject = courseid[0];
          const coursenumber = courseid[1];
          const course = await Course.find({ subject: coursesubject,
                                            number: coursenumber });
          res.json({
            code: 200,
            result: course,
            success: true,
          });
        })
      );

    // get all courses
    coursesRoute.get(async (req, res) => {
      const courses = await Course.find({});
      res.status(200).send({
        message: "Successfully retrieved all courses.",
        data: courses
      });
    });
  
    course.post(async (req, res) => {
        for (let i = 0; i < req.body.classes.length; i++) {
            const { name, subject, number, rooms } = req.body.classes[i];
        //console.log(req.body);
        const newCourse = new Course({
          name,
          subject,
          number,
          rooms
        });
        await newCourse.save();
        }
        res.status(200).send({
            message: "Successfully created new course."
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
      res.status(200).send({
        message: "Successfully created new course."
      });
    });

    

    return router;
  };

  