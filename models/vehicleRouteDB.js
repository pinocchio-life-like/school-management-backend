const mongoose = require("mongoose");

const vehicleRouteSchema = new mongoose.Schema({
  routeName: String,
});

module.exports = mongoose.model("VehiclesRoute", vehicleRouteSchema);
