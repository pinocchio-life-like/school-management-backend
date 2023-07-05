const VehicleRoute = require("../../../models/assignVehicle");
const Route = require("../../../models/vehicleRouteDB");
const Vehicle = require("../../../models/vehicleDB");
exports.createRoute = async (req, res) => {
  try {
    const { vehicleName, routeName } = req.body;

    // Find the route by name
    const route = await Route.findOne({ routeName }).exec();

    // Check if the route exists
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    // Find the vehicle by name
    const vehicle = await Vehicle.findOne({ vehicleName }).exec();

    // Check if the vehicle exists
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Check if the vehicle is already assigned to the route
    const existingAssignment = await VehicleRoute.findOne({
      vehicle: vehicle._id,
      route: route._id,
    }).exec();
    if (existingAssignment) {
      return res
        .status(409)
        .json({ message: "Vehicle is already assigned to this route" });
    }

    // Create a new assignment with the vehicleName and routeName fields
    const assignment = new VehicleRoute({
      vehicle: vehicle._id,
      route: route._id,
      // other fields...
    });

    // Save the new assignment to the database
    await assignment.save();

    res.json({ message: "Assignment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateVehicleRoute = async (req, res) => {
  try {
    const id = req.params.id;
    const { vehicle, route } = req.body;

    const updatedVehicleRoute = await VehicleRoute.updateOne(
      { _id: id },
      { vehicle: vehicle, route: route },
      { upsert: true }
    );

    res.status(200).json(updatedVehicleRoute);
  } catch (error) {
    res.status(500).json({ message: "Error updating route", error });
  }
};

exports.deleteVehicleRoute = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedVehicleRoute = await VehicleRoute.findOneAndDelete({
      _id: id,
    });

    if (!deletedVehicleRoute) {
      return res.status(404).json({ message: "Vehicle route not found" });
    }

    res.status(200).json({ message: "Vehicle route deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vehicle route", error });
  }
};
exports.getAllVehicleRoutes = async (req, res) => {
  try {
    const { routeName, vehicleName } = req.query;

    const query = {};

    if (routeName) {
      query.routeName = routeName;
    }

    if (vehicleName) {
      query.vehicleName = vehicleName;
    }

    const vehicleRoutes = await VehicleRoute.find(query).exec();
    res.status(200).json(vehicleRoutes);
  } catch (error) {
    res.status(500).json({ message: "Error getting vehicle routes", error });
  }
};
