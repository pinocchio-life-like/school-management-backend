const express = require("express");
const teacherRouter = express.Router();
const HttpError = require("../models/http-error");
const teachers = require("../controllers/TeacherController/teacher-controller");

teacherRouter.get("/teacher/teacherList", teachers.getTeachers);
teacherRouter.get("/teacher/getAttending", teachers.getAttending);
teacherRouter.post("/teacher/teacherList", teachers.registerTeachers);
teacherRouter.post("/teacher/setAttending", teachers.setAttending);
teacherRouter.delete("/teacher/teacherList/:id", teachers.deleteTeachers);
teacherRouter.delete("/teacher/deleteAttender/:id", teachers.deleteAttender);

module.exports = teacherRouter;
