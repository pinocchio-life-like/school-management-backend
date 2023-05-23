const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FeeSchema = new Schema({
  feeId: String,
  feeName: String,
  feeType: String,
  feeStartDate: String,
  feeDueDate: String,
  amount: Number,
  fineAmount: Number,
  studentsList: Array,
});
module.exports = mongoose.model("Fee", FeeSchema);
