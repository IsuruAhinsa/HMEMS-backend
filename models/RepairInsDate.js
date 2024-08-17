const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const RepairInsReqSchema = new Schema({

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
    required: true
  },
  genericName: {
    type: String,
    required: true
  },
insdate:{
    type: String,
    required: true
}

  
}, { timestamps: true });

// Check for duplicate serial number before saving


module.exports = mongoose.model('RepairInsReqs', RepairInsReqSchema);
