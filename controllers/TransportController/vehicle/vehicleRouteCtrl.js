const vehicleRoute = require("../../../models/vehicleRouteDB");

exports.createVehicleRoute = async (req, res) => {
  try {
    // Check if vehicle with same details already exists
    const existingVehicleRoute = await vehicleRoute.findOne({
      routeName: req.body.routeName,
    });
    if (existingVehicleRoute) {
      return res.status(409).json({ message: "Route already exists" });
    }

    // Create new vehicle
    const route = new vehicleRoute(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getVehicleRoute = async (req, res) => {
  try {
    const route = await vehicleRoute.find();
    res.status(200).json(route);
  } catch (error) {
    console.log("Couldnt get list of routes");
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleRoute = async (req, res) => {
  try {
    const route = await vehicleRoute.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: "Vehicle Route not found" });
    }
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVehicleRoute = async (req, res) => {
  try {
    const route = await vehicleRoute.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!route) {
      return res.status(404).json({ message: "Vehicle Route not found" });
    }
    res.status(200).json(route);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteVehicleRoute = async (req, res) => {
  try {
    const route = await vehicleRoute.findByIdAndDelete(req.params.id);
    console.log("Route ID:", req.params.id);
    if (!route) {
      return res.status(404).json({ message: "Vehicle Route not found" });
    }
    res.status(200).json({ message: "Vehicle Route deleted with success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
