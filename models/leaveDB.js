const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LeaveSchema = new Schema({
  leaveId: String,
  startDate: String,
  endDate: String,
  status: {
    type: String,
    default: "On leave",
  },
});
module.exports = mongoose.model("Leave", LeaveSchema);
