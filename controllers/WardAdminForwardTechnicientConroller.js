const WardAdminForwardTechnicient = require('../models/WardAdminForwardTechnicient');
const mongoose = require('mongoose');

// Create a new WardAdminForwardTechnicient request
const addWardAdminForwardTechnicient = async (req, res) => {
  const {
    serialNumber,
    model,
    brand,
    requestType,
    comment,
    genericName,
    ward,
    wardLineMatrix,
    numberOfUnit,
    roomNumber
  } = req.body;

  try {
    const newTechnicientReq = await WardAdminForwardTechnicient.create({
      serialNumber,
      model,
      brand,
      requestType,
      comment,
      genericName,
      ward,
      wardLineMatrix,
      numberOfUnit,
      roomNumber
    });
    res.status(201).json(newTechnicientReq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all WardAdminForwardTechnicient requests
const getAllWardAdminForwardTechnicient = async (req, res) => {
  try {
    const allTechnicientReqs = await WardAdminForwardTechnicient.find().sort({ createdAt: -1 });
    res.status(200).json(allTechnicientReqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single WardAdminForwardTechnicient request by ID
const getSingleWardAdminForwardTechnicient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Ward Admin Forward Technicient Request' });
  }

  try {
    const singleTechnicientReq = await WardAdminForwardTechnicient.findById(id);
    if (!singleTechnicientReq) {
      return res.status(404).json({ error: 'Ward Admin Forward Technicient Request not found' });
    }
    res.status(200).json(singleTechnicientReq);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a WardAdminForwardTechnicient request by ID
const updateWardAdminForwardTechnicient = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Ward Admin Forward Technicient Request ID' });
  }

  try {
    const updatedTechnicientReq = await WardAdminForwardTechnicient.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTechnicientReq) {
      return res.status(404).json({ error: 'Ward Admin Forward Technicient Request not found' });
    }
    res.status(200).json(updatedTechnicientReq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a WardAdminForwardTechnicient request by ID
const deleteWardAdminForwardTechnicient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Ward Admin Forward Technicient Request ID' });
  }

  try {
    const deletedTechnicientReq = await WardAdminForwardTechnicient.findOneAndDelete({ _id: id });
    if (!deletedTechnicientReq) {
      return res.status(404).json({ error: 'Ward Admin Forward Technicient Request not found' });
    }
    res.status(200).json(deletedTechnicientReq);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addWardAdminForwardTechnicient,
  getAllWardAdminForwardTechnicient,
  getSingleWardAdminForwardTechnicient,
  updateWardAdminForwardTechnicient,
  deleteWardAdminForwardTechnicient
};
