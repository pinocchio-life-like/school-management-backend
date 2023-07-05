const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DriverSchema = new Schema({
  teacherId: String,
  teacherName: String,
  competitionalLevel: String,
  grade: Array,
  status: String,
  coursesId: Array,
  assignedTo: Array,
  fname: String,
  lname: String,
  phone: String,
  licence: String,
});
module.exports = mongoose.model("Driver", DriverSchema);
