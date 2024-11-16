const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchasingReqSchema = new Schema({
  condition: {
    type: String,
<<<<<<< HEAD
    required: false,
  },
  wardLineMatrix: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  requestpriority: {
    type: String,
    required: false,
  },
  serialNumber: {
    type: String,
    required: false,
=======
    required: false
  },
  serialNumber: {
    type: String,
    required: false
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
  },
  vendor: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  purchasingDate: {
    type: Date,
    required: false,
  },
  warrantyPeriod: {
    type: String,
    required: false,
  },
  genericName: {
    type: String,
    required: true,
  },
  equipmentType: {
    type: String,
    required: true,
  },
  numberOfUnit: {
    type: String,
    required: true,
  },
  ward: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: String,
    default: '', // This will be set before saving
  },
  numberOfUnit: {
    type: String,
    required: true
  },
  ward: {
    type: String,
    required: true
  },
  orderNumber: {
    type: String,
    default: ''  // This will be set before saving
  },
  comment: {
    type: String,
<<<<<<< HEAD
    required: false,
  },
}, { timestamps: true });

// Middleware to set orderNumber before saving
PurchasingReqSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      // Use this.constructor to access the model directly
      const count = await this.constructor.countDocuments();
      this.orderNumber = `ORD-${count + 1}`; // Custom logic for generating order number
=======
    required: false
  }
}, { timestamps: true });

// Middleware to set orderNumber before saving
PurchasingReqSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      // Generate a new order number, for example using the current count of documents
      const count = await mongoose.model('Purchasing_Equipment').countDocuments();
      this.orderNumber = `ORD-${count + 1}`; // You can customize this logic
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Static method for adding a new Purchasing Request
<<<<<<< HEAD
PurchasingReqSchema.statics.add = async function ({
  condition,
  wardLineMatrix,
  roomNumber,
  requestpriority,
  serialNumber,
  vendor,
  brand,
  model,
  purchasingDate,
  warrantyPeriod,
  genericName,
  equipmentType,
  numberOfUnit,
  ward,
  comment
}) {
  // Validation: Ensure that required fields are filled
  if (!vendor || !brand || !model || !genericName || !equipmentType || !numberOfUnit || !ward || !wardLineMatrix || !roomNumber || !requestpriority) {
    throw new Error('All fields except "condition", "serialNumber", and "comment" must be filled');
  }

  // Create an object to hold only the required fields
  const data = {
    condition,
    wardLineMatrix,
    roomNumber,
    requestpriority,
=======
PurchasingReqSchema.statics.add = async function(condition, serialNumber, vendor, brand, model, purchasingDate, warrantyPeriod, genericName, equipmentType, numberOfUnit, ward, comment) {
  Validation
  if (!vendor || !brand || !model || !purchasingDate || !warrantyPeriod || !genericName || !equipmentType || !numberOfUnit || !ward) {
    throw new Error('All fields except "condition", "serialNumber", and "comment" must be filled');
  }

 // Create an object to hold only the required fields
  const data = {
    condition,
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
    serialNumber,
    vendor,
    brand,
    model,
    purchasingDate,
    warrantyPeriod,
    genericName,
    equipmentType,
    numberOfUnit,
<<<<<<< HEAD
    ward,
=======
    ward
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
  };

  // Include comment field only if it's provided
  if (comment) {
    data.comment = comment;
  }

  // Now you can use the data object to create your document
  const newPurchasingReq = new this(data);
  await newPurchasingReq.save();
  return newPurchasingReq;
};

module.exports = mongoose.model('Purchasing_Equipment', PurchasingReqSchema);
