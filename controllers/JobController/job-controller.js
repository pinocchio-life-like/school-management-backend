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
  try {
    await Job.updateOne(
      {
        id: req.params.id,
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
  const {
    jobName,
    deadline,
    tags,
    designation,
    description,
    jobType,
    netSalary,
  } = req.body;
  const job = new Job({
    jobName: jobName,
    deadline: deadline,
    tags: tags,
    designation: designation,
    description: description,
    jobType: jobType,
    salary: netSalary,
    applicants: [],
  });
  try {
    await job.save();
    res.status(201).json({ jobs: job });
  } catch (err) {
    console.error(err); // Log the actual error
    res.status(404).json({ error: "Could not register jobs" }); // Send a more informative response
  }
};

const applyJob = async (req, res, next) => {
  const {
    id,
    firstName,
    lastName,
    gender,
    email,
    mobile,
    address,
    education,
    experiance,
    coverLetter,
  } = req.body;

  // Assuming you have a Job model defined based on JobSchema
  try {
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Check if the applicant has already applied
    const hasApplied = job.applicants.some((applicant) => {
      return applicant.email && applicant.email === email;
    });
    if (hasApplied) {
      return res
        .status(400)
        .json({ error: "You have already applied for this job" });
    }

    let date = new Date();
    date = date.toLocaleDateString("es-CL");

    const newApplicant = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      email: email,
      mobile: mobile,
      address: address,
      education: education,
      experiance: experiance,
      coverLetter: coverLetter,
      appliedOn: date,
      applicationStatus: "Pending",
      resume: req.file.path,
    };

    job.applicants.push(newApplicant);
    await job.save();

    res.json({ message: "Successfully applied for the job" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const setInterview = async (req, res, next) => {
  const id = req.params.id;
  const { interviewDate, email } = req.body;

  try {
    const result = await Job.updateOne(
      { _id: id, "applicants.email": email },
      {
        $set: {
          "applicants.$.interviewDate": interviewDate,
          "applicants.$.applicationStatus": "Interviewing",
        },
      }
    );

    if (result.nModified === 0) {
      res.status(404).json({ message: "Applicant not found." });
      return;
    }

    res.status(200).json({ message: "Interview date set successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

const closeInterview = async (req, res, next) => {
  const id = req.params.id;
  const { email } = req.body;
  console.log(email);
  try {
    const result = await Job.updateOne(
      { _id: id, "applicants.email": email },
      {
        $set: {
          "applicants.$.applicationStatus": "Closed",
        },
      }
    );
    if (result.nModified === 0) {
      res.status(404).json({ message: "Applicant not found." });
      return;
    }
    res.status(200).json({ message: "Interview date set successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getJobs = getJobs;
exports.applyJob = applyJob;
exports.updateJobs = updateJobs;
exports.setInterview = setInterview;
exports.registerJobs = registerJobs;
exports.closeInterview = closeInterview;
