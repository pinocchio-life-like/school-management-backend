const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CalenderYearListSchema = new Schema({
  year: String,
  grade: String,
  studentsId: Array,
});
module.exports = mongoose.model("CalenderYearList", CalenderYearListSchema);
