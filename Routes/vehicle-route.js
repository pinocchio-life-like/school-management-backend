const express = require("express");
const vehicleRouter = express.Router();
const vehicle = require("../controllers/TransportController/vehicle/vehicle");

vehicleRouter.post("/vehicles/register", vehicle.createVehicle);
vehicleRouter.get("/vehicle", vehicle.getVehicles);
vehicleRouter.get("/vehicle/:id", vehicle.getVehicle);
vehicleRouter.put("/vehicle/:id", vehicle.updateVehicle);
vehicleRouter.delete("/vehicle/:id", vehicle.deleteVehicle);

module.exports = vehicleRouter;
