import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  room: { type: String, required: true },
  read: { type: Boolean, default: false }, // Add this field
  readAt: Date
});

const messageChat = mongoose.model('message-market', messageSchema);
export default messageChat;
