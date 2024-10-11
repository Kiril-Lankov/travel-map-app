const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

const app = express();

dotenv.config();

app.use(express.json());
async function dropEmailIndex() {
    try {
      // Connect to MongoDB
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  
      // Get the list of indexes on the "pins" collection
      const indexes = await mongoose.connection.db.collection('pins').indexes();
      console.log("Current indexes:", indexes);
  
      // Drop the email index (by key)
      const result = await mongoose.connection.db.collection('pins').dropIndex({ email: 1 });
      console.log("Index dropped:", result);
  
      // Close the connection
      mongoose.connection.close();
    } catch (error) {
      console.error("Error dropping index:", error.message);
    }
  }
  
  
  dropEmailIndex();

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(8800, ()=> {
    console.log("Backend Server is running!")
});