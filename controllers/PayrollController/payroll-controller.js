const HttpError = require("../../models/http-error");
const Payroll = require("../../models/payrollDB");

const getPayrolls = async (req, res, next) => {
  let payrolls;
  try {
    payrolls = await Payroll.find();
  } catch (err) {
    res.send(new HttpError("Check your Internet Connection", 404));
    return;
  }
  res.status(201).json({
    payrolls: payrolls.map((payrolls) => payrolls.toObject({ getters: true })),
  });
};

const pay = async (req, res, next) => {
  console.log(req.body);
  const { month } = req.body;
  const employeeId = req.params.id;
  try {
    const filter = { employeeId, "payment.month": month };
    const update = { $set: { "payment.$.status": "Paid" } };
    await Payroll.updateOne(filter, update);

    res.status(201).json({ message: "Payroll Successfully Released" });
  } catch (err) {
    res.send(new HttpError("Couldn't release Payroll", 404));
  }
};

const registerPayrolls = async (req, res, next) => {
  const {
    employeeId,
    salary,
    startDate,
    startMonth,
    employeeName,
    designation,
    payment,
  } = req.body;
  const payrolls = new Payroll({
    employeeId: employeeId,
    salary: salary,
    startMonth: startMonth,
    startDate: startDate,
    employeeName: employeeName,
    designation: designation,
    payment: payment,
  });

  try {
    const existingPayroll = await Payroll.findOne({
      employeeId: employeeId,
    });

    if (!existingPayroll) {
      await payrolls.save();
      res.status(201).json({ message: "Payroll Registered Successfully" });
      return;
    }
    res.status(404).json({ message: "Employee Already exists" });
  } catch (err) {
    res.status(404).json({ message: "Check Your internet and try Again!" });
  }
};

exports.getPayrolls = getPayrolls;
exports.pay = pay;
exports.registerPayrolls = registerPayrolls;
