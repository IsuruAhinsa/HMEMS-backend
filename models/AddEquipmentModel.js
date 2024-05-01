const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const AddEquipmentSchema = new Schema({
  serialNumber: {
    type: String,
    required: true
  },
  vendorID: {
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
  ward: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  purchasingDate: {
    type: Date,
    required: true
  },
  warrantyPeriod: {
    type: String, // Consider changing to Number if warranty periods are numerical
    required: true
  },
  cost: {
    type: Number, // Adjust if cost needs to be stored as a different type
    required: true
  },
  genericName: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: false // Assuming this field is optional
  },
  equipmentType: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Check for duplicate serial number before saving
AddEquipmentSchema.pre('save', async function(next) {
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

module.exports = mongoose.model('Add_Equipment', AddEquipmentSchema);
