const express = require("express");
const attendanceRouter = express.Router();
const HttpError = require("../models/http-error");
const attendances = require("../controllers/AttendanceController/attendance-controller");

attendanceRouter.get("/attendance/getAttendance", attendances.getAttendance);
attendanceRouter.post("/attendance/takeAttendance", attendances.takeAttendance);
// attendanceRouter.delete("/class/classList/:id", attendances.deleteClasses);

module.exports = attendanceRouter;
