const express = require("express");
const courseRouter = express.Router();
const HttpError = require("../models/http-error");
const courses = require("../controllers/CourseController/course-controller");

courseRouter.get("/course/courseBreakDown", courses.getCourses);
courseRouter.post("/course/courseBreakDown", courses.registerCourse);

courseRouter.get("/course/offeredCourses", courses.getOfferedCourses);
courseRouter.post("/course/offerCourses", courses.offerCourses);
courseRouter.delete("/course/courseGroup/:id", courses.deleteCourseGroup);

module.exports = courseRouter;
