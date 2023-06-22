const HttpError = require("../../models/http-error");
const Employee = require("../../models/employeeDB");
const Leave = require("../../models/leaveDB");
const EmployeeAttendance = require("../../models/employeeAttendaceDB");

const getEmployees = async (req, res, next) => {
  let employees;
  try {
    const employee = await Employee.find();
    const employeePromises = employee.map(async (empl) => {
      const lv = await Leave.findOne({
        leaveId: empl.employeeId,
        status: "On leave",
      });
      if (lv) {
        return {
          ...empl.toObject(),
          status: lv.status,
        };
      }
      return empl.toObject();
    });
    employees = await Promise.all(employeePromises);
  } catch (err) {
    res.status(404).send({ message: "Check your Internet Connection" });
    return;
  }
  res.status(201).json({
    employees,
  });
};

const deleteEmployees = async (req, res, next) => {
  try {
    await Employee.deleteOne({ employeeId: req.params.id });
    res.status(201).json({ deleted: "successfull" });
  } catch (err) {
    res.send(new HttpError("Couldnt delete Employee", 404));
  }
};

const registerEmployees = async (req, res, next) => {
  const {
    firstName,
    lastName,
    gender,
    email,
    description,
    designation,
    jobType,
    phoneNumber,
    netSalary,
    dob,
    city,
    street,
  } = req.body;

  const id = `${firstName}.empl.${email.slice(0, 5)}`;
  try {
    const filter = { employeeId: id };
    const update = {
      $set: {
        employeeId: id,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        email: email,
        description: description,
        designation: designation,
        jobType: jobType,
        phoneNumber: phoneNumber,
        netSalary: netSalary,
        dob: dob,
        city: city,
        street: street,
      },
    };
    const options = { upsert: true };
    await Employee.updateOne(filter, update, options);
    res.status(201).json({ success: true });
  } catch (err) {
    res.send(new HttpError("Couldnt Register", 404));
  }
};

const updateEmployee = async (req, res, next) => {
  const {
    firstName,
    lastName,
    gender,
    email,
    description,
    designation,
    jobType,
    phoneNumber,
    netSalary,
    dob,
    city,
    street,
  } = req.body;

  const idOld = req.params.id;
  const idNew = `${firstName}.empl.${email.slice(0, 5)}`;
  try {
    const filter = { employeeId: idOld };
    const update = {
      $set: {
        employeeId: idNew,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        email: email,
        description: description,
        designation: designation,
        jobType: jobType,
        phoneNumber: phoneNumber,
        netSalary: netSalary,
        dob: dob,
        city: city,
        street: street,
      },
    };
    const options = { upsert: true };
    await Employee.updateOne(filter, update, options);
    res.status(201).json({ success: true });
  } catch (err) {
    res.send(new HttpError("Couldnt Register", 404));
  }
};

const suspendEmployee = async (req, res, next) => {
  let date = new Date();
  date = date.toLocaleDateString("es-CL");
  const id = req.params.id;
  try {
    const filter = { employeeId: id };
    const update = {
      $set: {
        status: "Suspended",
        endDate: date,
      },
    };
    await Employee.updateOne(filter, update);
    res.status(201).json({ success: true });
  } catch (err) {
    res.send(new HttpError("Couldnt Register", 404));
  }
};

const activateEmployee = async (req, res, next) => {
  let date = new Date();
  date = date.toLocaleDateString("es-CL");
  const id = req.params.id;
  try {
    const filter = { employeeId: id };
    const update = {
      $set: {
        status: "Active",
        startDate: date,
      },
    };
    await Employee.updateOne(filter, update);
    res.status(201).json({ success: true });
  } catch (err) {
    res.send(new HttpError("Couldnt Register", 404));
  }
};

const getLeave = async (req, res, next) => {
  let leaves;
  let employees;
  try {
    leaves = await Leave.find();
    employees = await Employee.find();
    employees = employees.length;
  } catch (err) {
    res.send(new HttpError("Check your Internet Connection", 404));
    return;
  }
  res.status(201).json({
    totalLeaves: leaves.length,
    employees: employees,
    leaves: leaves.map((leaves) => leaves.toObject({ getters: true })),
  });
};

const registerLeave = async (req, res, next) => {
  const id = req.params.id;
  const {
    startDate,
    endDate,
    leaveReason,
    employeeName,
    jobType,
    designation,
  } = req.body;
  try {
    const leave = new Leave({
      leaveId: id,
      startDate: startDate,
      endDate: endDate,
      leaveReason: leaveReason,
      employeeName: employeeName,
      jobType: jobType,
      designation: designation,
    });
    await leave.save();

    await Employee.updateOne(
      { employeeId: id },
      {
        $set: {
          status: "On leave",
        },
      }
    );
    res.status(201).json({ success: true });
  } catch (err) {
    res.send(new HttpError("Couldnt Register", 404));
  }
};

const employeeAttendance = async (req, res, next) => {
  try {
    for (let i = 0; i < req.body.length; i++) {
      const { employeeId, attendanceDate, attendanceStatus } = req.body[i];
      const attendance = new EmployeeAttendance({
        employeeId: employeeId,
        attendanceDate: attendanceDate,
        attendanceStatus: attendanceStatus,
      });
      const existingAttendance = await EmployeeAttendance.findOne({
        employeeId: employeeId,
        attendanceDate: attendanceDate,
      });

      if (!existingAttendance) {
        await attendance.save();
        continue;
      }

      await EmployeeAttendance.replaceOne(
        { employeeId: employeeId, attendanceDate: attendanceDate },
        {
          employeeId: employeeId,
          attendanceDate: attendanceDate,
          attendanceStatus: attendanceStatus,
        }
      );
    }
    res.status(201).json({ message: "success" });
  } catch (err) {
    res.send(new HttpError("Attendance Successful", 404));
  }
};

const getAttendance = async (req, res, next) => {
  let attendances;
  try {
    attendances = await EmployeeAttendance.find();
  } catch (err) {
    res.status(404).send(new HttpError("Check your Internet Connection", 404));
    return;
  }

  const attendanceStatusCounts = {
    Present: 0,
    Absent: 0,
    Late: 0,
    HalfDay: 0,
  };

  // Count attendance statuses
  attendances.forEach((attendance) => {
    if (attendance.attendanceStatus === "Present") {
      attendanceStatusCounts.Present++;
    } else if (attendance.attendanceStatus === "Absent") {
      attendanceStatusCounts.Absent++;
    } else if (attendance.attendanceStatus === "Late") {
      attendanceStatusCounts.Late++;
    } else if (attendance.attendanceStatus === "HalfDay") {
      attendanceStatusCounts.HalfDay++;
    }
  });

  res.status(201).json({
    attendances: attendances.map((attendance) =>
      attendance.toObject({ getters: true })
    ),
    attendanceStatusCounts: attendanceStatusCounts,
  });
};

const endLeave = async (req, res, next) => {
  const id = req.params.id;

  let endDate = new Date();
  endDate = endDate.toLocaleDateString("es-CL");

  try {
    await Employee.updateOne(
      { employeeId: id },
      {
        $set: {
          status: "Active",
        },
      }
    );
    await Leave.updateOne(
      { leaveId: id },
      {
        $set: {
          status: "Active",
          endDate: endDate,
        },
      }
    );
    res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(404).json({ message: "Failed" });
  }
};

exports.activateEmployee = activateEmployee;
exports.endLeave = endLeave;
exports.getEmployees = getEmployees;
exports.updateEmployee = updateEmployee;
exports.deleteEmployees = deleteEmployees;
exports.suspendEmployee = suspendEmployee;
exports.getLeave = getLeave;
exports.getAttendance = getAttendance;
exports.registerLeave = registerLeave;
exports.registerEmployees = registerEmployees;
exports.employeeAttendance = employeeAttendance;
