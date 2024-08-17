const RepairReq = require("../models/EqipmentRepairModel");
const mongoose = require('mongoose');

// Create a new repair request
const addRepairRequest = async (req, res) => {
    const {
      serialNumber,
      model,
      comment,
      brand,
      ValidationValue,
      genericName,
      status
    } = req.body;

    try {
      // Check for duplicate serial number
      const existingRepairReq = await RepairReq.findOne({ serialNumber });
      if (existingRepairReq) {
        return res.status(400).json({ error: 'Serial number already in use' });
      }

      const newRepairReq = await RepairReq.create({
        serialNumber,
        model,
        comment,
        brand,
        ValidationValue,
        genericName,
        status
      });
      res.status(201).json(newRepairReq);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// Get all repair requests
const getAllRepairRequests = async (req, res) => {
  try {
    const allRepairRequests = await RepairReq.find().sort({ createdAt: -1 });
    res.status(200).json(allRepairRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a repair request
const deleteRepairRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such repair request' });
  }

  const deletedRepairReq = await RepairReq.findOneAndDelete({ _id: id });

  if (!deletedRepairReq) {
    return res.status(400).json({ error: 'No such repair request' });
  }

  res.status(200).json(deletedRepairReq);
};

// Update a repair request
const updateRepairRequest = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid repair request ID' });
    }

    const updatedRepairReq = await RepairReq.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedRepairReq) {
      return res.status(404).json({ error: 'Repair request not found' });
    }

    res.status(200).json(updatedRepairReq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single repair request by ID
const getSingleRepairRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such repair request' });
  }

  const singleRepairReq = await RepairReq.findById(id);

  if (!singleRepairReq) {
    return res.status(404).json({ error: 'No such repair request' });
  }

  res.status(200).json(singleRepairReq);
};

module.exports = {
  addRepairRequest,
  getAllRepairRequests,
  deleteRepairRequest,
  updateRepairRequest,
  getSingleRepairRequest
};
