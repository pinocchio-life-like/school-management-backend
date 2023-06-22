const HttpError = require("../../models/http-error");
const Course = require("../../models/courseDB");
const CourseGroup = require("../../models/coursesGroupDB");
const { updateMany } = require("../../models/markDB");

const getCourses = async (req, res, next) => {
  let courses;
  try {
    courses = await Course.find();
  } catch (err) {
    console.log("Couldnt get list of students");
    res.send(new HttpError("No students Found", 404));
    return;
  }
  res.json({
    courses: courses.map((course) => course.toObject({ getters: true })),
  });
  //   const course = new Courses();
};

const registerCourse = async (req, res, next) => {
  const { courseName, grade, courseId, offered, teacherId } = req.body;
  let existingCourse;
  try {
    existingCourse = await Course.findOne({
      courseId: courseId,
      courseName: courseName,
    });
  } catch (err) {
    console.log("error looking for email to create student");
    // return;
  }
  if (existingCourse) {
    res.send(new HttpError("Course Already Exists", 404));
    console.log("Course Already Exists");
    return;
  }
  const course = new Course({
    courseName,
    grade,
    courseId,
    offered,
    teacherId,
  });
  try {
    await course.save();
    res.status(201).json({ course: course.toObject({ getters: true }) });
  } catch (err) {
    return new HttpError("Error in DB schema", 500);
  }
};

const getOfferedCourses = async (req, res, next) => {
  let coursesGroup;
  try {
    coursesGroup = await CourseGroup.find();
  } catch (err) {
    console.log("Couldnt get Course Groups");
    res.send(new HttpError("No students Found", 404));
    return;
  }
  res.status(201).json({
    coursesGroup: coursesGroup.map((groups) =>
      groups.toObject({ getters: true })
    ),
  });
};

const offerCourses = async (req, res, next) => {
  const { courseGroupName, offered, offeredId, notOffered, grade } = req.body;
  const courseGroup = new CourseGroup({
    courseGroupName,
    offered,
    offeredId,
    notOffered,
    grade,
  });

  try {
    const existingCourseGroup = await CourseGroup.findOne({
      courseGroupName: courseGroupName,
    });

    if (!existingCourseGroup) {
      await courseGroup.save();
      res
        .status(201)
        .json({ courseGroup: courseGroup.toObject({ getters: true }) });
      return;
    }

    await CourseGroup.replaceOne(
      { courseGroupName: courseGroupName },
      {
        courseGroupName: courseGroupName,
        offered: offered,
        offeredId: offeredId,
        notOffered: notOffered,
        grade: grade,
      }
    );

    await Course.updateMany(
      {
        grade: grade,
        courseId: { $in: offeredId },
      },
      {
        $set: {
          offered: "Offered",
        },
      }
    );

    await Course.updateMany(
      {
        grade: grade,
        courseId: { $nin: offeredId },
      },
      {
        $set: {
          offered: "Not Offered",
        },
      }
    );

    res.status(201).json({ courseGroup: courseGroup });
  } catch (err) {
    res.send(new HttpError("Couldnt Offer Courses", 404));
  }
};

const deleteCourseGroup = async (req, res, next) => {
  try {
    await CourseGroup.deleteOne({ _id: req.params.id });
    res.status(201).json({ deleted: "successfull" });
  } catch (err) {
    res.send(new HttpError("Couldnt delete class", 404));
  }
};

exports.getCourses = getCourses;
exports.registerCourse = registerCourse;
exports.offerCourses = offerCourses;
exports.getOfferedCourses = getOfferedCourses;
exports.deleteCourseGroup = deleteCourseGroup;
