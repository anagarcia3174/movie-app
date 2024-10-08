const mongoose = require('mongoose');

async function connectDB() {
    try {
      await mongoose.connect(process.env.MONGODB_ATLAS_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  }
  
  module.exports = connectDB;
