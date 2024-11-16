const express = require('express');
const {
  addWardAdminForwardTechnicient,
  getAllWardAdminForwardTechnicient,
  getSingleWardAdminForwardTechnicient,
  updateWardAdminForwardTechnicient,
  deleteWardAdminForwardTechnicient
} = require('../controllers/WardAdminForwardTechnicientConroller');

const router = express.Router();

// POST request to create a new Ward Admin Forward Technicient request
router.post('/createwardadminforwardtechnicient', addWardAdminForwardTechnicient);

// GET request to retrieve all Ward Admin Forward Technicient requests
router.get('/getallwardadminforwardtechnicient', getAllWardAdminForwardTechnicient);

// GET request to retrieve a single Ward Admin Forward Technicient request by ID
router.get('/:id', getSingleWardAdminForwardTechnicient);

// PATCH request to update a Ward Admin Forward Technicient request by ID
router.patch('/:id', updateWardAdminForwardTechnicient);

// DELETE request to delete a Ward Admin Forward Technicient request by ID
router.delete('/:id', deleteWardAdminForwardTechnicient);

module.exports = router;
