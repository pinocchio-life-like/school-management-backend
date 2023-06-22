const express = require("express");
const employeeRouter = express.Router();
const HttpError = require("../models/http-error");
const employees = require("../controllers/EmployeeController/employee-controller");

employeeRouter.get("/employee/employeeList", employees.getEmployees);
employeeRouter.get("/employee/employeeLeave", employees.getLeave);
employeeRouter.get("/employee/getAttendance", employees.getAttendance);
employeeRouter.post("/employee/employeeList", employees.registerEmployees);
employeeRouter.delete("/employee/employeeList/:id", employees.deleteEmployees);
employeeRouter.patch("/employee/employeeList/:id", employees.updateEmployee);
employeeRouter.post("/employee/attendance", employees.employeeAttendance);
employeeRouter.patch("/employee/employeeLeave/:id", employees.registerLeave);
employeeRouter.patch("/employee/endLeave/:id", employees.endLeave);
employeeRouter.patch(
  "/employee/employeeSuspend/:id",
  employees.suspendEmployee
);
employeeRouter.patch(
  "/employee/employeeActivate/:id",
  employees.activateEmployee
);

module.exports = employeeRouter;
