const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

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
app.use("/api/users", userRoute);

app.listen(8800, ()=> {
    console.log("Backend Server is running!")
});