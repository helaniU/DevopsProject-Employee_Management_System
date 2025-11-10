// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Connected (Local)✅");
//   } catch (error) {
//     console.error("MongoDB connection failed ❌:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;


import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URL; // 👈 changed from MONGO_URI to MONGO_URL

  if (!mongoUri) {
    console.error("❌ MONGO_URL is not defined! Check .env or docker-compose.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
