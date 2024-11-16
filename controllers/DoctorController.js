const DoctorPrReq = require('../models/Doctor');
const mongoose = require('mongoose');

// Create a new Doctor Procurement Request
const addDoctorPrReq = async (req, res) => {
  const {
    serialNumber,
    model,
    brand,
    genericName,
    reason,
    comment,
    ward,
    roomNumber,
    requestType,
    wardLineMatrix,
    type,
    numberOfUnit,
    status// Accepting status from the request (optional)
  } = req.body;

  try {
    const newDoctorPrReq = await DoctorPrReq.create({
      serialNumber,
      model,
      brand,
      genericName,
      reason,
      comment,
      ward,
      roomNumber,
      wardLineMatrix,
      type,
      requestType,
      numberOfUnit,
      status: status  // Default to "Super Admin Pending
    });
    res.status(201).json(newDoctorPrReq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Doctor Procurement Requests
const getAllDoctorPrReqs = async (req, res) => {
  try {
    const allDoctorPrReqs = await DoctorPrReq.find().sort({ createdAt: -1 });
    res.status(200).json(allDoctorPrReqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single Doctor Procurement Request
const getSingleDoctorPrReq = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Doctor Procurement Request' });
  }

  try {
    const singleDoctorPrReq = await DoctorPrReq.findById(id);
    if (!singleDoctorPrReq) {
      return res.status(404).json({ error: 'Doctor Procurement Request not found' });
    }
    res.status(200).json(singleDoctorPrReq);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a Doctor Procurement Request
const updateDoctorPrReq = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Doctor Procurement Request ID' });
  }

  try {
    const updatedDoctorPrReq = await DoctorPrReq.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedDoctorPrReq) {
      return res.status(404).json({ error: 'Doctor Procurement Request not found' });
    }
    res.status(200).json(updatedDoctorPrReq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Doctor Procurement Request
const deleteDoctorPrReq = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Doctor Procurement Request ID' });
  }

  try {
    const deletedDoctorPrReq = await DoctorPrReq.findOneAndDelete({ _id: id });
    if (!deletedDoctorPrReq) {
      return res.status(404).json({ error: 'Doctor Procurement Request not found' });
    }
    res.status(200).json(deletedDoctorPrReq);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


//get by serial

const getSingleDoctorPrReqbyserial = async (req, res) => {
  const { serial } = req.params;
  
  try {
    const doctorPrReq = await DoctorPrReq.findOne({ serialNumber:serial });
    if (!doctorPrReq) {
      return res.status(404).json({ error: 'Doctor Procurement Request not found' });
    }
    res.status(200).json(doctorPrReq);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Update by serial
const updateDoctorPrReqbyserial = async (req, res) => {
  const { serial } = req.params;
  const updateData = req.body;

  try {
    const updatedDoctorPrReq = await DoctorPrReq.findOneAndUpdate(
      { serialNumber:serial },
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedDoctorPrReq) {
      return res.status(404).json({ error: 'Doctor Procurement Request not found' });
    }

    res.status(200).json(updatedDoctorPrReq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};








module.exports = {
  addDoctorPrReq,
  getAllDoctorPrReqs,
  getSingleDoctorPrReq,
  updateDoctorPrReq,
  deleteDoctorPrReq,
  getSingleDoctorPrReqbyserial,
  updateDoctorPrReqbyserial

};
