const express = require('express');
const {
    addRepairInsRequest,
    getAllRepairInsRequests,
    deleteRepairRequest,
    updateRepairRequest,
    getSingleRepairRequest
} = require('../controllers/RepairInsDateController'); // Adjust the path to your controller file if necessary

const router = express.Router();

// Create a new Repair Request
router.post('/', addRepairInsRequest);

// Get all Repair Requests
router.get('/', getAllRepairInsRequests,
);

// Get a single Repair Request by ID
router.get('/:id', getSingleRepairRequest);

// Update a Repair Request
<<<<<<< HEAD
router.patch('/:id', updateRepairRequest);
=======
router.put('/:id', updateRepairRequest);
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7

// Delete a Repair Request
router.delete('/:id', deleteRepairRequest);

module.exports = router;
