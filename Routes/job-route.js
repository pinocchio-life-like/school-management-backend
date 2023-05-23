const express = require("express");
const jobRouter = express.Router();
const HttpError = require("../models/http-error");
const jobs = require("../controllers/JobController/job-controller");

jobRouter.get("/job/jobList", jobs.getJobs);
jobRouter.post("/job/jobList", jobs.registerJobs);
jobRouter.patch("/job/jobList/:id", jobs.updateJobs);

module.exports = jobRouter;
