const nodemailer = require("nodemailer");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");


// Import routes
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const purchasingReqRoutes = require("./routes/purchasingReq");
const WardPurchasingReqRoutes = require("./routes/wardPurchasingReq");
const equipmentRoutes = require("./routes/equipment");
const quatationRoutes = require("./routes/quatation");
const RepairReq=require("./routes/RepairReq");
const insdate=require("./routes/repairintdate");
<<<<<<< HEAD
const doctor=require("./routes/doctorRoutes");
const wardAdminForwardTechnicientRoutes = require("./routes/WardAdminForwardTechnicientRoute");


=======




>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
// Create express app
const app = express();

// CORS options
const corsOptions = {
    origin: '*',
    credentials: true, // Access-Control-Allow-Credentials: true
    optionsSuccessStatus: 200,
};

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Logging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes setup
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/api/purchasingReq", purchasingReqRoutes);
app.use("/api/wardPurchasingReq", WardPurchasingReqRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/quotation", quatationRoutes);
app.use("/api/repaireq",RepairReq);
app.use("/api/insdate",insdate);
<<<<<<< HEAD
app.use("/api/doctorRoutes",doctor);
app.use('/api/wardadminforwardtechnicient',wardAdminForwardTechnicientRoutes);



// Handle GET request to root
app.get('/', (req, res) => {
    res.send('Welcome to the contact form API');
});
// Handle POST request to send email
app.post('/send', async (req, res) => {
   
=======
// Handle GET request to root
app.get('/', (req, res) => {
    res.send('Welcome to the contact form API');
});








// Handle POST request to send email
app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;


  
    
    const output = `
        <p>${name} have a new Order Request</p>
         <li> Our Hospital confirms your Quotation ! </li>
        <h3>Contact Details</h3>
        <ul>
            <li>Hospital Contact number :027 4455688 </li>
        
            <li>Hospital Email:hemes@gmail.com </li>
           
            
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: `"HMEMS Contact" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Contact Request from Node.js',
        text: 'Hello world?',
        html: output
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.json({ status: 'success',
            message: 'Email has been sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ msg: 'Error sending email', error: error.message });
    }
>>>>>>> 5a0c7532fa40fc617117263a4f80b69557d7b3e7
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database");
        app.listen(process.env.PORT, () => {
            console.log("Listening for requests on port", process.env.PORT);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });
