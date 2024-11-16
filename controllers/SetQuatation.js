<<<<<<< HEAD
require("dotenv").config();
const nodemailer = require("nodemailer");
=======
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
const Quotation = require("../models/SetQuatation");
const mongoose = require("mongoose");
const PurchasingReq = require("../models/PurchasingReqModel");

// Create a Quotation
const setQuotation = async (req, res) => {
  const {
<<<<<<< HEAD
    requestpriority,
=======
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
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
<<<<<<< HEAD
    ward,
    wardLineMatrix, 
    roomNumber,
    status,
    email
  } = req.body;
console.log(email);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Convert arrivalTimePeriod to a date and set its time to 00:00:00
  const arrivalDate = new Date(arrivalTimePeriod);
  arrivalDate.setHours(0, 0, 0, 0);

  if (arrivalDate < today) {
    return res
      .status(404)
      .json({ error: "Arrival time period must be today or a Future date." });
  }

  try {
    const newQuotation = await Quotation.create({
      requestpriority,
=======
  } = req.body;

  try {
    const newQuotation = await Quotation.create({
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
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
<<<<<<< HEAD
      ward,
      wardLineMatrix, 
      roomNumber,
      status,
      email
=======
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
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
<<<<<<< HEAD

    // Fetch the purchasing request by order number
    const pr = await PurchasingReq.findOne({ orderNumber });
    if (!pr) {
      return res.status(404).json({ error: "No such purchasing request" });
=======
    
    // Fetch the purchasing request by order number
    const pr = await PurchasingReq.findOne({ orderNumber });
    if (!pr) {
      return res.status(404).json({ error: 'No such purchasing request' });
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
    }
    const adminPrBrand = pr.brand;

    // Fetch and sort quotations by price in ascending order
    let quotations = await Quotation.find({ orderNumber }).sort({
      quotationPrice: 1,
    });

    if (quotations.length === 0) {
<<<<<<< HEAD
      return res.status(404).json({ error: "No such quotation" });
=======
      return res.status(404).json({ error: 'No such quotation' });
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
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
<<<<<<< HEAD
    console.error("Error fetching quotation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

=======
    console.error('Error fetching quotation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete a quotation
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
const deleteQuotation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid quotation ID" });
  }

<<<<<<< HEAD
  // Retrieve the quotation from the database to get all required fields
  const deletedQuotation = await Quotation.findByIdAndDelete(id);
=======
  const deletedQuotation = await Quotation.findOneAndDelete({ _id: id });
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7

  if (!deletedQuotation) {
    return res.status(400).json({ error: "No such quotation" });
  }
<<<<<<< HEAD
 
};



=======

  res.status(200).json(deletedQuotation);
};

>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
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

<<<<<<< HEAD
    const {  orderNumber, ward, roomNumber, wardLineMatrix, quotationPrice, arrivalTimePeriod, email,numberOfUnits,currentBrand } = updatedQuotation;

    const output = `
      <p>Dear Vendor </p>
      <p>We are pleased to inform you that our hospital has accepted your quotation.</p>
      <p>Details of your order request are as follows:</p>
      <ul>
        <li><strong>Order Number:</strong> ${orderNumber}</li>
        <li><strong>Quotation Price:</strong> ${quotationPrice}</li>
        <li><strong>Arrival Time Period:</strong> ${arrivalTimePeriod}</li>
        <li><strong>Brand Type :</strong> ${currentBrand}</li>
        <li><strong>Number Of Units :</strong> ${numberOfUnits}</li>
        <li><strong>Ward:</strong> ${ward || "N/A"}</li>
        <li><strong>Room Number:</strong> ${roomNumber || "N/A"}</li>
        <li><strong>Ward Line Matrix:</strong> ${wardLineMatrix || "N/A"}</li>
        
      </ul>
      <p>Should you have any questions or require further clarification, please do not hesitate to reach out to us.</p>
      <h3>Contact Details</h3>
      <ul>
        <li><strong>Hospital Contact Number:</strong> +94 27 445 5688</li>
        <li><strong>Hospital Email:</strong> hemes@gmail.com</li>
        <li><strong>Hospital Address:</strong> Hospital Juntion, Polonnaruwa </li>
      </ul>
      <p>Thank you for your continued partnership.</p>
      <p>Best regards,</p>
      <p><strong>HMEMS</strong></p>
    `;
  
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  
    let mailOptions = {
      from: `"HMEMS Contact" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Hospital Quotation Acceptance',
      text: 'Quotation Accepted',
      html: output,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return res.status(200).json({
        status: 'success',
        message: 'Email has been sent successfully, and quotation deleted.',
        updatedQuotation,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ msg: 'Error sending email', error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
=======
    res.status(200).json(updatedQuotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
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
