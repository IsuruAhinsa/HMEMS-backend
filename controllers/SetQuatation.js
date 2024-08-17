const Quotation = require("../models/SetQuatation");
const mongoose = require("mongoose");
const PurchasingReq = require("../models/PurchasingReqModel");

// Create a Quotation
const setQuotation = async (req, res) => {
  const {
    orderNumber,
    quotationPrice,
    warrantyPeriod,
    currentBrand,
    arrivalTimePeriod,
    numberOfUnits,
    comments,
    role,
    name,
    genericName,
  } = req.body;

  try {
    const newQuotation = await Quotation.create({
      orderNumber,
      quotationPrice,
      warrantyPeriod,
      currentBrand,
      arrivalTimePeriod,
      numberOfUnits,
      comments,
      firstName: name,
      role,
      genericName,
    });
    res.status(201).json(newQuotation);
    //res.status(200).json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all quotations grouped by orderNumber
const getAllQuotations = async (req, res) => {
  try {
    const allQuotations = await Quotation.aggregate([
      {
        $group: {
          _id: "$orderNumber",
          quotations: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: 1 } }, // Sort by orderNumber (group key)
    ]);
    res.status(200).json(allQuotations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single quotation bu order ID
const getSingleQuotationByOrderNumber = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    
    // Fetch the purchasing request by order number
    const pr = await PurchasingReq.findOne({ orderNumber });
    if (!pr) {
      return res.status(404).json({ error: 'No such purchasing request' });
    }
    const adminPrBrand = pr.brand;

    // Fetch and sort quotations by price in ascending order
    let quotations = await Quotation.find({ orderNumber }).sort({
      quotationPrice: 1,
    });

    if (quotations.length === 0) {
      return res.status(404).json({ error: 'No such quotation' });
    }

    // Sort quotations to have adminPrBrand first
    quotations = quotations.sort((a, b) => {
      if (a.brand === adminPrBrand && b.brand !== adminPrBrand) {
        return -1; // a comes before b
      }
      if (a.brand !== adminPrBrand && b.brand === adminPrBrand) {
        return 1; // b comes before a
      }
      return 0; // no change in order
    });

    res.status(200).json(quotations);
  } catch (error) {
    console.error('Error fetching quotation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete a quotation
const deleteQuotation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid quotation ID" });
  }

  const deletedQuotation = await Quotation.findOneAndDelete({ _id: id });

  if (!deletedQuotation) {
    return res.status(400).json({ error: "No such quotation" });
  }

  res.status(200).json(deletedQuotation);
};

// Update a quotation
const updateQuotation = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid quotation ID" });
    }

    const updatedQuotation = await Quotation.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedQuotation) {
      return res.status(404).json({ error: "Quotation not found" });
    }

    res.status(200).json(updatedQuotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single quotation
const getSingleQuotation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid quotation ID" });
  }

  const singleQuotation = await Quotation.findById(id);

  if (!singleQuotation) {
    return res.status(404).json({ error: "No such quotation" });
  }

  res.status(200).json(singleQuotation);
};

module.exports = {
  setQuotation,
  getAllQuotations,
  deleteQuotation,
  updateQuotation,
  getSingleQuotationByOrderNumber,
  getSingleQuotation,
};
