const HttpError = require("../../models/http-error");
const Employee = require("../../models/employeeDB");

const getEmployees = async (req, res, next) => {
  let employees;
  try {
    employees = await Employee.find();
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

exports.getEmployees = getEmployees;
exports.deleteEmployees = deleteEmployees;
exports.registerEmployees = registerEmployees;
