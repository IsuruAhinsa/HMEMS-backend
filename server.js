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
const doctor=require("./routes/doctorRoutes");
const wardAdminForwardTechnicientRoutes = require("./routes/WardAdminForwardTechnicientRoute");


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
app.use("/api/doctorRoutes",doctor);
app.use('/api/wardadminforwardtechnicient',wardAdminForwardTechnicientRoutes);



// Handle GET request to root
app.get('/', (req, res) => {
    res.send('Welcome to the contact form API');
});
// Handle POST request to send email
app.post('/send', async (req, res) => {
   
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
