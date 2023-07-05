const { Driver, Vehicle } = require("../../models/mapDB");

const createDriver = async (req, res) => {
  console.log(req.body);
  try {
    const driver = await Driver.create(req.body);
    return res.status(201).json(driver);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Could not create driver" });
  }
};

const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    return res.status(200).json(drivers);
  } catch (error) {
    return res.status(400).json({ error: "Could not get drivers" });
  }
};

const createVehicle = async (req, res) => {
  console.log(req.body);
  try {
    const { driverId } = req.body;
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    const vehicle = await Vehicle.create({ ...req.body, driver });
    return res.status(201).json(vehicle);
  } catch (error) {
    return res.status(400).json({ error: "Could not create vehicle" });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(400).json({ error: "Could not get vehicles" });
  }
};

const assignDriverToVehicle = async (req, res) => {
  try {
    const { driverId, vehicleId } = req.body;
    const driver = await Driver.findById(driverId);
    const vehicle = await Vehicle.findById(vehicleId);
    if (!driver || !vehicle) {
      return res.status(404).json({ error: "Driver or vehicle not found" });
    }
    vehicle.driver = driver;
    await vehicle.save();
    return res.status(200).json(vehicle);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Could not assign driver to vehicle" });
  }
};

const updateVehicleLocation = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { lat, lng } = req.body;
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    await Vehicle.updateOne(
      { _id: vehicleId },
      { $set: { location: { type: "Point", coordinates: [lng, lat] } } }
    );
    return res.status(200).json({ message: "Location updated" });
  } catch (error) {
    return res.status(400).json({ error: "Could not update location" });
  }
};

module.exports = {
  createDriver,
  getDrivers,
  createVehicle,
  getVehicles,
  updateVehicleLocation,
  assignDriverToVehicle,
};
