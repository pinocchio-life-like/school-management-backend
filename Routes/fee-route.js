const express = require("express");
const feeRouter = express.Router();
const HttpError = require("../models/http-error");
const fees = require("../controllers/FeeController/fee-controller");

feeRouter.get("/fee/feeList", fees.getFees);
feeRouter.post("/fee/feeList", fees.registerFees);
feeRouter.patch("/fee/feeList/:id", fees.collectFee);
feeRouter.delete("/fee/feeList/:id", fees.deleteFees);
feeRouter.patch("/fee/feeList/add/:id", fees.addStudentToFee);

module.exports = feeRouter;
