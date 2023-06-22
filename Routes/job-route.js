const express = require("express");
const jobRouter = express.Router();
const HttpError = require("../models/http-error");
const jobs = require("../controllers/JobController/job-controller");
const fileUpload = require("../middleware/file-upload");
const { check } = require("express-validator");

jobRouter.get("/job/jobList", jobs.getJobs);
jobRouter.post("/job/jobList", jobs.registerJobs);
jobRouter.patch("/job/jobList/:id", jobs.updateJobs);
jobRouter.patch("/job/setInterview/:id", jobs.setInterview);
jobRouter.patch("/job/closeInterview/:id", jobs.closeInterview);
jobRouter.post(
  "/job/apply",
  fileUpload.single("resume"),
  [check("email").normalizeEmail().isEmail()],
  jobs.applyJob
);

module.exports = jobRouter;
