const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const date = new Date();
const today = date.toLocaleDateString("sv-SE");

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  gender: String,
  birthDate: String,
  religion: String,
  admissionNumber: String,
  grade: String,
  section: String,
  rollNumber: String,
  parentFirstName: String,
  parentLastName: String,
  parentRelation: String,
  parentPhoneNumber: String,
  email: String,
  province: String,
  street: String,
  houseNumber: String,
  admissionDate: {
    type: String,
    default: today,
  },
  // siblingGrade: String,
  // siblingSection: String,
  // siblingName: String,
  promotted: {
    type: String,
    default: "pending",
  },
  admissionStatus: {
    type: String,
    default: "not admitted",
  },
});

module.exports = mongoose.model("Student", studentSchema);
