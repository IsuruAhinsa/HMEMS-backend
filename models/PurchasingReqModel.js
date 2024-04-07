const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PurchasingReqSchema = new Schema({
  serialNumber: {
    type: String,
    required: true
  },
  vendor: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  purchasingDate: {
    type: Date,
    required: true
  },
  warrantyPeriod: {
    type: String,
    required: true
  },
  genericName: {
    type: String,
    required: true
  },
  equipmentType: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: false // Assuming this field is optional
  }
}, { timestamps: true });

module.exports = mongoose.model('Purchasing_Equipment', PurchasingReqSchema);
