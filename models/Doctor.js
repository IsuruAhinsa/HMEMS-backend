const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DoctorPrReq = new Schema({
  serialNumber: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  genericName: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: false
  },
  ward: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: false
  },
  wardLineMatrix: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  numberOfUnit: {
    type: String,
    required: true
  },
  requestType: {
    type: String,
    required: true
  },
  // New status field
  status: {
    type: String,
    required: true,
    default: "Ward Admin Pending"
  }
}, { timestamps: true });

DoctorPrReq.pre('save', function(next) {
  const roomNumberPattern = /^Room-\d+$/;
  if (!roomNumberPattern.test(this.roomNumber)) {
    this.roomNumber = `Room-${this.roomNumber.replace(/\D/g, '')}`;
  }
  next();
});

module.exports = mongoose.model('Doctor_Pr_Req', DoctorPrReq);
