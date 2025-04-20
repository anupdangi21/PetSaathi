// controllers/chatController.js
import Message from "../Models/messageChat.js";

export const getRoomId = (userA, userB) => {
  return [userA, userB].sort().join('--');
};

export const getChatHistory = async (buyerEmail, sellerEmail) => {
  const room = getRoomId(buyerEmail, sellerEmail);
  const messages = await Message.find({ room }).sort({ timestamp: 1 }).lean();
  return messages;
};

export const saveMessage = async (messageData) => {
  const room = getRoomId(messageData.from, messageData.to);
  const message = new Message({
    ...messageData,
    room,
    timestamp: new Date(messageData.timestamp),
  });
  await message.save();
  return message;
};