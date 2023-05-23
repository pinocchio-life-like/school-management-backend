const express = require("express");
const employeeRouter = express.Router();
const HttpError = require("../models/http-error");
const employees = require("../controllers/EmployeeController/employee-controller");

employeeRouter.get("/employee/employeeList", employees.getEmployees);
employeeRouter.post("/employee/employeeList", employees.registerEmployees);
employeeRouter.delete("/employee/employeeList/:id", employees.deleteEmployees);

module.exports = employeeRouter;