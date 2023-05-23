const express = require("express");
const classRouter = express.Router();
const HttpError = require("../models/http-error");
const classes = require("../controllers/ClassController/class-controller");

classRouter.get("/class/classList", classes.getClasses);
classRouter.post("/class/classList", classes.registerClasses);
classRouter.delete("/class/classList/:id", classes.deleteClasses);

module.exports = classRouter;
