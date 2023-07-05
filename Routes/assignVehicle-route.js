const express = require("express");
const assignVehicleRouter = express.Router();
const vehicleRouteController = require("../controllers/TransportController/vehicle/assignVehicleCtrl");

assignVehicleRouter.post("/assignVehicle", vehicleRouteController.createRoute);
assignVehicleRouter.put(
  "/assignVehicle/:id",
  vehicleRouteController.updateVehicleRoute
);
assignVehicleRouter.delete(
  "/assignVehicle/:id",
  vehicleRouteController.deleteVehicleRoute
);

assignVehicleRouter.get(
  "/assignVehicle",
  vehicleRouteController.getAllVehicleRoutes
);


 
module.exports = assignVehicleRouter;
