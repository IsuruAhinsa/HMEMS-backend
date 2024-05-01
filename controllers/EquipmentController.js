const Equipment=require("../models/AddEquipmentModel");
const mongoose = require('mongoose');


// Create a Add_equipment
const addEquipment= async (req, res) => {
    const {
      serialNumber,
      vendorID,
      brand,
      model,
      ward,
      status,
      purchasingDate,
      warrantyPeriod,
      cost,
      genericName,
      comment,
      equipmentType,} = req.body;
    try {
      const AddEquip = await Equipment.create({
        serialNumber,
        vendorID,
        brand,
        model,
        ward,
        status,
        purchasingDate,
        warrantyPeriod,
        cost,
        genericName,
        comment,
        equipmentType,
      });
      res.status(201).json(AddEquip);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

//get all equipment
  const getAllEquipment = async (req, res) => {
    try {
      const AllEquipment = await Equipment.find().sort({ createdAt: -1 });
      res.status(200).json(AllEquipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  //delete
const deleteEquipment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such equip'})
  }

  const deleteEquip = await Equipment.findOneAndDelete({_id: id})

  if(!deleteEquip) {
    return res.status(400).json({error: 'No such equip'})
  }

  res.status(200).json(deleteEquip)
}

//upadte ward  pr

const updateEquipment = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid updateEquip ID' });
    }
    const  updateEquip= await Equipment.findByIdAndUpdate(id, updateData, { new: true });
    if (!updateEquip) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    res.status(200).json(updateEquip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get single user
const getSingeEquipment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such equipment'})
  }

  const singleEquipment = await Equipment.findById(id)

  if (!singleEquipment) {
    return res.status(404).json({error: 'No such equipment'})
  }

  res.status(200).json(singleEquipment)
}






  

module.exports={
  addEquipment,
  getAllEquipment,
  deleteEquipment,
  updateEquipment,
  getSingeEquipment
}