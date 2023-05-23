const HttpError = require("../../models/http-error");
const Job = require("../../models/jobDB");

const getJobs = async (req, res, next) => {
  let jobs;
  try {
    jobs = await Job.find();
  } catch (err) {
    res.send(new HttpError("Check your Internet Connection", 404));
    return;
  }
  res.status(201).json({
    jobs: jobs.map((jobs) => jobs.toObject({ getters: true })),
  });
};

const updateJobs = async (req, res, next) => {
  console.log("hello");
  try {
    await Job.updateOne(
      {
        id: req.param.id,
      },
      {
        $set: {
          status: "Closed",
        },
      }
    );
    res.status(201).json({ updated: "successfull" });
  } catch (err) {
    res.send(new HttpError("Couldnt delete Job", 404));
  }
};

const registerJobs = async (req, res, next) => {
  const { jobName, deadline, tags, designation, description, jobType, salary } =
    req.body;
  const jobs = new Job({
    jobName: jobName,
    deadline: deadline,
    tags: tags,
    designation: designation,
    description: description,
    jobType: jobType,
    salary: salary,
    applicants: [],
  });
  try {
    const existingJob = await Job.findOne({
      jobName: jobName,
      deadline: deadline,
      tags: tags,
      designation: designation,
      description: description,
      jobType: jobType,
      salary: salary,
    });

    if (!existingJob) {
      await jobs.save();
      res.status(201).json({ jobs: jobs.toObject({ getters: true }) });
      return;
    }

    await Job.replaceOne(
      {
        jobName: jobName,
        deadline: deadline,
        tags: tags,
        designation: designation,
        description: description,
        jobType: jobType,
        salary: salary,
      },
      {
        jobName: jobName,
        deadline: deadline,
        tags: tags,
        designation: designation,
        description: description,
        jobType: jobType,
        salary: salary,
      }
    );
    res.status(201).json({ jobs: jobs });
  } catch (err) {
    res.send(new HttpError("Couldnt Offer Jobs", 404));
  }
};

exports.getJobs = getJobs;
exports.updateJobs = updateJobs;
exports.registerJobs = registerJobs;
