const express = require('express');
const {
  setQuotation,
  getAllQuotations,
  deleteQuotation,
  updateQuotation,
  getSingleQuotationByOrderNumber,
  getSingleQuotation,
} = require('../controllers/SetQuatation');

const router = express.Router();

// Create a Quotation
router.post('/', setQuotation);

// Get all Quotations
router.get('/', getAllQuotations);

// Get all Quotations by order Number

router.get('/getOrNum/:orderNumber', getSingleQuotationByOrderNumber);

// Get a single Quotation
router.get('/:id', getSingleQuotation);

// Update a Quotation
<<<<<<< HEAD
router.patch('/:id', updateQuotation);
=======
router.put('/:id', updateQuotation);
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7

// Delete a Quotation
router.delete('/:id', deleteQuotation);

module.exports = router;
