import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB conectado exitosamente");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
