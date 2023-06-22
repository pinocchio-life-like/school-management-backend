const express = require("express");
const payrollRouter = express.Router();
const HttpError = require("../models/http-error");
const payrolls = require("../controllers/PayrollController/payroll-controller");

payrollRouter.get("/payroll/payrollList", payrolls.getPayrolls);
payrollRouter.post("/payroll/register", payrolls.registerPayrolls);
payrollRouter.patch("/payroll/pay/:id", payrolls.pay);

module.exports = payrollRouter;
