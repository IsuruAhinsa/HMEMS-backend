const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WardAdminForwardTechnicient= new Schema({
  serialNumber: {
    type: String,
    required: true,
 
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  requestType: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: false
  },
  genericName: {
    type: String,
    required: true
  },
  ward: {
    type: String,
    required: true
  },
  wardLineMatrix: {
    type: String,
    required: false
  },
  numberOfUnit: {
    type: String,
    required: false
  },
  roomNumber: {
    type: String,
    required: false
  },
}, { timestamps: true });



module.exports = mongoose.model('WardAdminForwardTechnicient', WardAdminForwardTechnicient);
