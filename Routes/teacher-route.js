const express = require("express");
const teacherRouter = express.Router();
const HttpError = require("../models/http-error");
const teachers = require("../controllers/TeacherController/teacher-controller");

teacherRouter.get("/teacher/teacherList", teachers.getTeachers);
teacherRouter.post("/teacher/teacherList", teachers.registerTeachers);
teacherRouter.delete("/teacher/teacherList/:id", teachers.deleteTeachers);

module.exports = teacherRouter;
