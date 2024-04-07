const PurchasingReq = require('../models/PurchasingReqModel');
const mongoose = require('mongoose');

// Get all PR

const getAllPr = async (req, res) => {
  try {
    const AllPr = await PurchasingReq.find().sort({ createdAt: -1 });
    res.status(200).json(AllPr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




// Get a single user by ID
const getAddUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Adduser ID' });
    }
    const Adduser = await AddUser.findById(id);
    if (!Adduser) {
      return res.status(404).json({ error: 'AddUser not found' });
    }
    res.status(200).json(Adduser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a newPR
const createReq = async (req, res) => {
  const { serialNumber,vendor,brand,model,purchasingDate,warrantyPeriod,genericName,equipmentType,comment } = req.body;
  try {
    const prReq = await PurchasingReq.create({ serialNumber,vendor,brand,model,purchasingDate,warrantyPeriod,genericName,equipmentType,comment });
    res.status(201).json(prReq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Adduser by ID
const deleteAddUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Adduser ID' });
    }
    const Adduser = await AddUser.findByIdAndDelete(id);
    if (!Adduser) {
      return res.status(404).json({ error: 'AddUser not found' });
    }
    res.status(200).json(Adduser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Adduser by ID
const updateAddUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Adduser ID' });
    }
    const Adduser = await AddUser.findByIdAndUpdate(id, updateData, { new: true });
    if (!Adduser) {
      return res.status(404).json({ error: 'AddUser not found' });
    }
    res.status(200).json(Adduser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPr,
  getAddUser,
  createReq ,
  deleteAddUser,
  updateAddUser
};
