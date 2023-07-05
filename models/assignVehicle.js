const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleRouteSchema = new Schema({
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  route: {
    type: Schema.Types.ObjectId,
    ref: "Route",
  },
});

module.exports = mongoose.model("VehicleRoute", VehicleRouteSchema);
