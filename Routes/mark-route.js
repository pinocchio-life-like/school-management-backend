const express = require("express");
const markRouter = express.Router();
const HttpError = require("../models/http-error");
const marks = require("../controllers/MarkController/mark-controller");

markRouter.get("/mark/markList", marks.getMarks);
markRouter.post("/mark/markList", marks.admitMarks);
markRouter.delete("/mark/markList/:id", marks.deleteMarks);

module.exports = markRouter;
