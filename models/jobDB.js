const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobSchema = new Schema({
  jobName: String,
  deadline: String,
  tags: Array,
  designation: String,
  description: String,
  jobType: String,
  salary: Number,
  applicants: Array,
  status: {
    type: String,
    default: "Ongoing",
  },
});
module.exports = mongoose.model("Job", JobSchema);
