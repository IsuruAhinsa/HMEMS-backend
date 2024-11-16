const express = require('express');
const {
  addDoctorPrReq,
  getAllDoctorPrReqs,
  getSingleDoctorPrReq,
  updateDoctorPrReq,
  deleteDoctorPrReq,
  updateDoctorPrReqbyserial,
  getSingleDoctorPrReqbyserial,
} = require('../controllers/DoctorController');

const router = express.Router();

// POST request to create a new Doctor Procurement Request
router.post('/createdoctorprreq', addDoctorPrReq);

// GET request to retrieve all Doctor Procurement Requests
router.get('/getalldoctorprreqs', getAllDoctorPrReqs);

// GET request to retrieve a single Doctor Procurement Request by ID
router.get('/:id', getSingleDoctorPrReq);

// PATCH request to update a Doctor Procurement Request by ID
router.patch('/:id', updateDoctorPrReq);



router.patch('/updatebyserial/:serial',updateDoctorPrReqbyserial);
router.get('/getbyserial/:serial', getSingleDoctorPrReqbyserial);



// DELETE request to delete a Doctor Procurement Request by ID
router.delete('/:id', deleteDoctorPrReq);

module.exports = router;
