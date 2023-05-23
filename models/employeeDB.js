const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let date = new Date();
date = date.toLocaleDateString("es-CL");
const EmployeeSchema = new Schema({
  employeeId: String,
  firstName: String,
  lastName: String,
  gender: String,
  email: String,
  description: String,
  designation: String,
  jobType: String,
  phoneNumber: String,
  netSalary: Number,
  dob: String,
  city: String,
  street: String,
  startDate: {
    type: String,
    default: date,
  },
  endDate: {
    type: String,
    default: "-",
  },
  status: {
    type: String,
    default: "Active",
  },
});
module.exports = mongoose.model("Employee", EmployeeSchema);
