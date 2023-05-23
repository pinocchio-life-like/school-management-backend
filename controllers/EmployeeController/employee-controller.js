const HttpError = require("../../models/http-error");
const Employee = require("../../models/employeeDB");
const Leave = require("../../models/leaveDB");

const getEmployees = async (req, res, next) => {
  let employees;
  try {
    employees = await Employee.find();
    const employee = employees.map(async (empl) => {
      const lv = await Leave.findOne({
        leaveId: empl.employeeId,
        status: "On leave",
      });
      if (lv) {
        return {
          ...empl,
          status: lv.status,
        };
      }
      return empl;
    });
  } catch (err) {
    res.send(new HttpError("Check your Internet Connection", 404));
    return;
  }
  res.status(201).json({
    employees: employees.map((employees) =>
      employees.toObject({ getters: true })
    ),
  });
};

const deleteEmployees = async (req, res, next) => {
  try {
    await Employee.deleteOne({ _id: req.params.id });
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

const getLeave = async (req, res, next) => {
  let leaves;
  try {
    leaves = await Leave.find();
  } catch (err) {
    res.send(new HttpError("Check your Internet Connection", 404));
    return;
  }
  res.status(201).json({
    leaves: leaves.map((leaves) => leaves.toObject({ getters: true })),
  });
};

const registerLeave = async (req, res, next) => {
  const id = req.params.id;
  const { startDate, endDate, leaveReason } = req.body;
  try {
    // const filter = { employeeId: id };
    // const update = {
    //   $set: {
    //     status: "On Leave",
    //   },
    // };
    // await Employee.updateOne(filter, update);

    const leave = new Leave({
      leaveId: id,
      startDate: startDate,
      endDate: endDate,
      leaveReason: leaveReason,
    });
    await leave.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.send(new HttpError("Couldnt Register", 404));
  }
};

exports.getEmployees = getEmployees;
exports.updateEmployee = updateEmployee;
exports.deleteEmployees = deleteEmployees;
exports.suspendEmployee = suspendEmployee;
exports.getLeave = getLeave;
exports.registerLeave = registerLeave;
exports.registerEmployees = registerEmployees;
