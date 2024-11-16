const RepairReq = require("../models/RepairInsDate");
const mongoose = require('mongoose');

// Create a new repair inspection request
const addRepairInsRequest = async (req, res) => {
    const {
      serialNumber,
      model,
      comment,
      brand,
      ValidationValue,
      genericName,
      requestType,
      insdate,   
      status
    } = req.body;

    try {
      // Check if a repair request with the same serialNumber already exists
      const existingRepairReq = await RepairReq.findOne({ serialNumber });

      if (existingRepairReq) {
        return res.status(400).json({ error: 'A repair request with this serial number already exists.' });
      }

      // Create a new repair request document
      const newRepairReq = await RepairReq.create({
        serialNumber,
        model,
        comment,
        brand,
        ValidationValue,
        requestType,
        genericName,
        insdate,
        status
      });

      res.status(201).json(newRepairReq);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// Get all repair inspection requests
const getAllRepairInsRequests = async (req, res) => {
  try {
    const allRepairInsRequests = await RepairReq.find().sort({ createdAt: -1 });
    res.status(200).json(allRepairInsRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a repair inspection request
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

// Update a repair inspection request
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

// Get a single repair inspection request by ID
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
  addRepairInsRequest,
  getAllRepairInsRequests,
  deleteRepairRequest,
  updateRepairRequest,
  getSingleRepairRequest
};
