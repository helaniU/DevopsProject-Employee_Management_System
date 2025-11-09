import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String },
  birthday: { type: Date },
  position: { type: String },
  gender: { type: String },
  married: { type: String },
  role: { type: String, enum: ["admin", "employee"], default: "employee" },
  image: { type: String },
  rememberMe: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("User", userSchema);// Model name singular, capitalized. 
// This will create/use the users collection in MongoDB automatically. ✅
