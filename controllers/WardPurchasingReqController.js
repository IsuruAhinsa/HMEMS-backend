const wardPurchasingReq = require("../models/WardPurchasingReqModel");
//const { get } = require("../routes/workouts");
const mongoose = require("mongoose");

// Create a new Ward PR
const wardCreateReq = async (req, res) => {
  const {serialNumber,reason,ward,brand,model,purchasingDate, warrantyPeriod,genericName,numberOfUnit,prType,comment} = req.body;
  try {
    const prReq = await wardPurchasingReq.create({serialNumber,reason,ward,brand,model,purchasingDate,warrantyPeriod,genericName,numberOfUnit,prType,comment
    });
    res.status(201).json(prReq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get all ward pr
const getAllWardPr = async (req, res) => {
  try {
    const AllWardPr = await wardPurchasingReq.find().sort({ createdAt: -1 });
    res.status(200).json(AllWardPr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



//delete ward pr
const deleteWardPr = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such wardPr'})
  }

  const dropWardPr = await wardPurchasingReq.findOneAndDelete({_id: id})

  if(!dropWardPr) {
    return res.status(400).json({error: 'No such wardPr'})
  }

  res.status(200).json(dropWardPr)
}

//upadte ward  pr

const updateWardPr = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Wardpr ID' });
    }
    const Wardpr = await wardPurchasingReq.findByIdAndUpdate(id, updateData, { new: true });
    if (!Wardpr) {
      return res.status(404).json({ error: 'AddUser not found' });
    }
    res.status(200).json(Wardpr);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get single user
const getSingeWardPr = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const singleWard = await wardPurchasingReq.findById(id)

  if (!singleWard) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(singleWard)
}





module.exports = {
  wardCreateReq,
  getAllWardPr,
  deleteWardPr,
  updateWardPr,
  getSingeWardPr

};
