const Maintenance = require("../../../models/maintenanceDB");

// Get all maintenance events
const getMaintenances = async (req, res) => {
  try {
    const maintenances = await Maintenance.find().populate("vehicle");
    res.status(200).json(maintenances);
  } catch (error) {
    console.error("Error fetching maintenances:", error);
    res.status(500).json({ message: "Failed to fetch maintenances" });
  }
};

// Create a new maintenance event
const createMaintenance = async (req, res) => {
  const { title, start, end, vehicle, remark } = req.body;

  try {
    const maintenance = new Maintenance({
      title,
      start,
      end,
      vehicle,
      remark,
    });
    await maintenance.save();
    res.status(201).json(maintenance);
  } catch (error) {
    console.error("Error creating maintenance:", error);
    res.status(500).json({ message: "Failed to create maintenance" });
  }
};

// Update an existing maintenance event
const updateMaintenance = async (req, res) => {
  const { id } = req.params;
  const { title, start, end, vehicle, remark } = req.body;

  try {
    const maintenance = await Maintenance.findByIdAndUpdate(
      id,
      {
        title,
        start,
        end,
        vehicle,
        remark,
      },
      { new: true }
    ).populate("vehicle");
    res.status(200).json(maintenance);
  } catch (error) {
    console.error("Error updating maintenance:", error);
    res.status(500).json({ message: "Failed to update maintenance" });
  }
};

// Delete a maintenance event
const deleteMaintenance = async (req, res) => {
  const { id } = req.params;

  try {
    await Maintenance.findByIdAndDelete(id);
    res.status(204).json({});
  } catch (error) {
    console.error("Error deleting maintenance:", error);
    res.status(500).json({ message: "Failed to delete maintenance" });
  }
};

module.exports = {
  getMaintenances,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
};
