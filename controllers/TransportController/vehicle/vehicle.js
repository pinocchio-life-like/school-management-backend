const Vehicle = require("../../../models/vehicleDB");

exports.createVehicle = async (req, res) => {
  try {
    // Check if vehicle with same details already exists
    const existingVehicle = await Vehicle.findOne({
      vehicleName: req.body.vehicleName,
      vehicleModel: req.body.vehicleModel,
      vehicleNumber: req.body.vehicleNumber,
    });
    if (existingVehicle) {
      return res.status(409).json({ message: "Vehicle already exists" });
    }

    // Create new vehicle
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getVehicles = async (req, res) => {
  console.log("Received GET request for /vehicle");
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    console.log("Couldnt get list of vehicles");
    res.status(500).json({ message: error.message });
  }
};

exports.getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    console.log("Vehicle ID:", req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
