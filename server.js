require("dotenv").config();
const cors=require("cors");

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const purchasingReqRoutes = require("./routes/purchasingReq")
const WardPurchasingReqRoutes=require("./routes/wardPurchasingReq")
const equipmentRoutes=require("./routes/equipment")
//const requireAuth=require('./middleware/requireAuth')

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

// express app
const app = express();

// middleware
app.use(express.json());

app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/api/purchasingReq", purchasingReqRoutes)
app.use ("/api/wardPurchasingReq",WardPurchasingReqRoutes)
app.use("/api/equipment",equipmentRoutes)

//app.use('app/requireAuth',requireAuth)

// connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected to database");
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log("listening for requests on port", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
