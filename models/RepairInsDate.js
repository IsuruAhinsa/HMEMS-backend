const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const RepairInsReqSchema = new Schema({

  serialNumber: {
<<<<<<< HEAD
   
=======
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
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
<<<<<<< HEAD

  requestType:{
    type: String,
    required: true

  },
insdate:{
    type: String,
    required: true
},status:{
  type:String,
  required:true,
  default:"Tecnicient Advice Pending"
}


=======
insdate:{
    type: String,
    required: true
}

>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
  
}, { timestamps: true });

// Check for duplicate serial number before saving


module.exports = mongoose.model('RepairInsReqs', RepairInsReqSchema);
