const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const RepairReqSchema = new Schema({

  serialNumber: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: false // Assuming this field is optional
  },

  brand:{
    type: String,
    required: false
  },
  ValidationValue: {
    type: String,
<<<<<<< HEAD
    required: false
=======
    required: true
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
  },
  genericName: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  }

  
}, { timestamps: true });

// Check for duplicate serial number before saving
RepairReqSchema.pre('save', async function(next) {
  try {
    const exists = await this.constructor.findOne({ serialNumber: this.serialNumber });
    if (exists) {
      throw new Error('Serial number already in use');
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('RepairReq', RepairReqSchema);
