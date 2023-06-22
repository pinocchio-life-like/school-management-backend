const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PayrollSchema = new Schema({
  employeeId: String,
  salary: Number,
  startDate: String,
  employeeName: String,
  designation: String,
  startMonth: String,
  payment: Array,
});
module.exports = mongoose.model("Payroll", PayrollSchema);
