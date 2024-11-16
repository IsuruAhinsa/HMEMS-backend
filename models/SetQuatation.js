const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const QuotationSchema = new Schema({
  orderNumber: {
    type: String,
    required: true
  },
  quotationPrice: {
    type: Number,
    required: true
  },
  warrantyPeriod: {
    type: String,
    required: true
  },
  currentBrand: {
    type: String,
    required: true
  },
  arrivalTimePeriod: {
    type: String,
    required: true
  },
  numberOfUnits: {
    type: Number,
    required: true
  },
  comments: {
    type: String,
    required: false // Optional field
  },

  firstName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  genericName: {
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

  ward: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true,
    default:"Vendor Approve"
  },
  requestpriority:{
    type:String,
    required:true
  }




  
}, { timestamps: true });

// QuotationSchema.statics.add = async function(orderNumber, quotationPrice, warrantyPeriod, currentBrand, arrivalTimePeriod, numberOfUnits, comments) {
//   // Validation
//   if (!orderNumber || !quotationPrice || !warrantyPeriod || !currentBrand || !arrivalTimePeriod || !numberOfUnits) {
//     throw new Error('All fields except "comments" must be filled');
//   }

//   // Create an object to hold only the required fields
//   const data = {
//     orderNumber,
//     quotationPrice,
//     warrantyPeriod,
//     currentBrand,
//     arrivalTimePeriod,
//     numberOfUnits
//   };

//   // Include comments field only if it's provided
//   if (comments) {
//     data.comments = comments;
//   }

//   // Now you can use the data object to create your document
//   const newQuotation = new this(data);
//   await newQuotation.save();
// };

module.exports = mongoose.model('Quotation', QuotationSchema);
