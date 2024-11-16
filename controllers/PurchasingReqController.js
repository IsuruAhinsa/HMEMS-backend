const PurchasingReq = require('../models/PurchasingReqModel');
const mongoose = require('mongoose');
const WardPurchasingReqModel = require('../models/WardPurchasingReqModel');

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

//get one pr
const getOnePr = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid PR ID' });
  }

  try {
    const pr = await PurchasingReq.findById(id);

    if (!pr) {
      return res.status(404).json({ error: 'PR not found' });
    }

    res.status(200).json(pr);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};











// Create a newPR
const createReq = async (req, res) => {
  const {condition, serialNumber,vendor,brand,model,purchasingDate,warrantyPeriod,genericName,equipmentType,numberOfUnit,
<<<<<<< HEAD
    ward,roomNumber,wardLineMatrix,requestpriority,
    comment } = req.body;
  try {
    const prReq = await PurchasingReq.create({condition,roomNumber,wardLineMatrix,requestpriority, serialNumber,vendor,brand,model,purchasingDate,warrantyPeriod,genericName,equipmentType,numberOfUnit,
=======
    ward,comment } = req.body;
  try {
    const prReq = await PurchasingReq.create({condition, serialNumber,vendor,brand,model,purchasingDate,warrantyPeriod,genericName,equipmentType,numberOfUnit,
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
      ward,comment });
    res.status(201).json(prReq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




// Delete a PR by ID
const deletePR = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid PR ID' });
  }

  try {
    const deletedPR = await PurchasingReq.findByIdAndDelete(id);

    if (!deletedPR) {
      return res.status(404).json({ error: 'No such PR' });
    }

    res.status(200).json({ message: 'PR deleted successfully', deletedPR });
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
  getOnePr,
  createReq ,
  deletePR,
  updateAddUser
};
