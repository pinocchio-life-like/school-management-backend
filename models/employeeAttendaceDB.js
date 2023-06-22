const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmployeeAttendanceSchema = new Schema({
  employeeId: String,
  attendanceDate: String,
  attendanceStatus: String,
});
module.exports = mongoose.model("EmployeeAttendance", EmployeeAttendanceSchema);
