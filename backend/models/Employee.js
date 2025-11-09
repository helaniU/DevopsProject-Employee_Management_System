import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  image: { type: String }, // optional
}, { timestamps: true });

const employees = mongoose.model("employees", employeeSchema);
export default employees;
