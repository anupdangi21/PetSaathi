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

// Updated getConversations function
export const getConversations = async (userEmail) => {
  try {
    // Get all unique conversations for this user
    const rooms = await Message.distinct('room', {
      $or: [{ from: userEmail }, { to: userEmail }]
    });

    const conversations = await Promise.all(rooms.map(async (room) => {
      // Get the most recent message
      const lastMessage = await Message.findOne({ room })
        .sort({ timestamp: -1 })
        .lean();

      // Count unread messages sent TO this user that haven't been read
      const unreadCount = await Message.countDocuments({
        room,
        to: userEmail,
        read: false
      });

      const participants = room.split('--');
      const otherUser = participants.find(email => email !== userEmail);

      return {
        id: room,
        buyerEmail: participants[0],
        sellerEmail: participants[1],
        otherUser,
        lastMessage: lastMessage.content,
        timestamp: lastMessage.timestamp,
        unreadCount
      };
    }));

    return conversations.sort((a, b) => b.timestamp - a.timestamp);
  } catch (err) {
    console.error('Error in getConversations:', err);
    return [];
  }
};

export const saveMessage = async (messageData) => {
  const room = getRoomId(messageData.from, messageData.to);
  const message = new Message({
    ...messageData,
    room,
    read: false,
    timestamp: new Date(messageData.timestamp),
  });
  await message.save();
  return message;
};

export const markMessagesAsRead = async (room, userEmail) => {
  console.log(`Marking messages as read for ${userEmail} in ${room}`);
  await Message.updateMany(
    {
      room,
      to: userEmail,
      read: false
    },
    { $set: { read: true, readAt: new Date() } }
  );
};