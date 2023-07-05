const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const admissionRouter = require("./Routes/admission-route");
const courseRouter = require("./Routes/course-route");
const usersRoute = require("./Routes/users-route");
const classRouter = require("./Routes/class-route");
const calenderRouter = require("./Routes/calender-year-route");
const attendanceRouter = require("./Routes/attendance-route");
const app = express();
const cors = require("cors");
const path = require("path");
const teacherRouter = require("./Routes/teacher-route");
const markRouter = require("./Routes/mark-route");
const feeRouter = require("./Routes/fee-route");
const jobRouter = require("./Routes/job-route");
const employeeRouter = require("./Routes/employee-route");
const payrollRouter = require("./Routes/payroll-route");
const vehicleRouter = require("./Routes/vehicle-route");
const VehicleDirection = require("./Routes/vehicleRoute-route");
const assignVehicleRouter = require("./Routes/assignVehicle-route");

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json({
    limit: 5000000000,
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(
  cors({
    origin: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});
app.use(admissionRouter);
app.use(courseRouter);
app.use(classRouter);
app.use(calenderRouter);
app.use(attendanceRouter);
app.use(teacherRouter);
app.use(markRouter);
app.use(feeRouter);
app.use(jobRouter);
app.use(employeeRouter);
app.use(payrollRouter);
app.use(vehicleRouter);
app.use(VehicleDirection);
app.use(assignVehicleRouter);

app.use("/uploads/resume", express.static(path.join("uploads", "resume")));

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.use(usersRoute);

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.5mvlrfh.mongodb.net/sirm-demo?retryWrites=true&w=majority"
  )
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log("Could not connect \n", err);
  });
