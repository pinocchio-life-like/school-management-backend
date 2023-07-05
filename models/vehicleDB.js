const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleName: String,
  vehicleModel: String,
  vehicleNumber: String,
  yearMade: Number,
  capacity: Number,
  driver: {
    fname: String,
    lname: String,
    license: String,
    phone: String,
  },
});

module.exports = mongoose.model("Vehicles", vehicleSchema);
