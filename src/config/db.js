
import mongoose from "mongoose";

export const connectDB = async (mongoURI) => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(mongoURI, {    
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  } 
};