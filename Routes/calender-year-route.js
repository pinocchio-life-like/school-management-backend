const express = require("express");
const CalenderYear = express.Router();
const HttpError = require("../models/http-error");
const calenderYears = require("../controllers/CalenderYearController/calender-year-controller");

CalenderYear.get("/calender/calenderList", calenderYears.calenderList);
CalenderYear.post("/calender/individual", calenderYears.admitIndividual);
CalenderYear.post("/calender/multiple", calenderYears.admitMultiple);
CalenderYear.post("/calender/expel", calenderYears.expelIndividual);
// CalenderYear.delete("/calender/classList/:id", calenderYears.deleteClasses);

module.exports = CalenderYear;
