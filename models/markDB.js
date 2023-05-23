const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MarkSchema = new Schema({
  markId: String,
  studentName: String,
  courseId: String,
  firstSemister: [
    {
      mark1: {
        type: Number,
        default: 0,
      },
      mark2: {
        type: Number,
        default: 0,
      },
      mark3: {
        type: Number,
        default: 0,
      },
      mark4: {
        type: Number,
        default: 0,
      },
      mark5: {
        type: Number,
        default: 0,
      },
      final: {
        type: Number,
        default: 0,
      },
    },
  ],
  secondSemister: [
    {
      mark1: {
        type: Number,
        default: 0,
      },
      mark2: {
        type: Number,
        default: 0,
      },
      mark3: {
        type: Number,
        default: 0,
      },
      mark4: {
        type: Number,
        default: 0,
      },
      mark5: {
        type: Number,
        default: 0,
      },
      final: {
        type: Number,
        default: 0,
      },
    },
  ],
  firstGrade: { type: Number, default: 0 },
  secondGrade: { type: Number, default: 0 },
  finalGrade: { type: Number, default: 0 },
  year: String,
  grade: String,
  section: String,
});
module.exports = mongoose.model("Mark", MarkSchema);
