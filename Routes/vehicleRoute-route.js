const express = require("express");
const VehicleDirection = express.Router();
const vehicleRoute = require("../controllers/TransportController/vehicle/vehicleRouteCtrl");

VehicleDirection.post("/vehicleRoute", vehicleRoute.createVehicleRoute);
VehicleDirection.get("/vehicleRoute", vehicleRoute.getVehicleRoute);
VehicleDirection.get("/vehicleRoute/:id", vehicleRoute.getSingleRoute);
VehicleDirection.put("/vehicleRoute/:id", vehicleRoute.updateVehicleRoute);
VehicleDirection.delete("/vehicleRoute/:id", vehicleRoute.deleteVehicleRoute);

module.exports = VehicleDirection;
