const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wardPrReq = new Schema({
  serialNumber: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  ward: {
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
    type: String,
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
  numberOfUnit: {
    type: String,
    required: true
  },

  prType:{

    type: String,
    required:true

  },

  comment: {
    type: String,
    required: false // Assuming this field is optional
  }
 
},  {timestamps:true}
);

module.exports = mongoose.model('Ward_Pr_Req', wardPrReq);
