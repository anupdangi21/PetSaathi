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

export const getConversations = async (userEmail) => {
  const messages = await Message.find({
    $or: [{ from: userEmail }, { to: userEmail }]
  }).sort({ timestamp: -1 });

  const roomMap = new Map();
  messages.forEach((msg) => {
    const room = msg.room;
    if (!roomMap.has(room)) {
      const participants = room.split('--');
      const otherUser = participants.find(email => email !== userEmail);
      roomMap.set(room, {
        id: room,
        buyerEmail: participants[0],
        sellerEmail: participants[1],
        otherUser,
        lastMessage: msg.content,
        timestamp: msg.timestamp
      });
    }
  });

  return Array.from(roomMap.values()).sort((a, b) => b.timestamp - a.timestamp);
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