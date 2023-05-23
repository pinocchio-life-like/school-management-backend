const express = require("express");
const admissionRouter = express.Router();
const HttpError = require("../models/http-error");
const admission = require("../controllers/StudentAdmission/admission-controller.js");

const imageUpload = require("../middleware/image-upload");
admissionRouter.get("/", (req, res, next) => {
  console.log("Dashboard");
  res.json({ message: "DashBoard" });
});

admissionRouter.get("/admission", admission.getAdmission);
admissionRouter.get("/admission/studentsList", admission.getStudentsList);
admissionRouter.patch("/admission/updateStudent", admission.updateStudent);
admissionRouter.post("/admission", admission.admitStudent);

// admissionRouter.get("*", (req, res, next) => {
//   next();
// });

module.exports = admissionRouter;
