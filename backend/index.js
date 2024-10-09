const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins")

const app = express();

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("MongoDB Connected!")
})
.catch((error)=> {
    console.log(error)
});

app.use("/api/pins", pinRoute);

app.listen(8800, ()=> {
    console.log("Backend Server is running!")
});