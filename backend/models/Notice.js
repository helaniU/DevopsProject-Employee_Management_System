import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: String, default: new Date().toLocaleString() }
});

const notice = mongoose.model("notices", noticeSchema);
export default notice;
