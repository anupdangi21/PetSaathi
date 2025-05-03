// chatSocket.js
import { getChatHistory, saveMessage, getRoomId, getConversations  } from '../Controllers/messageChat.js';
import Message from "../Models/messageChat.js"
export const configureSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinRoom', async ({ buyerEmail, sellerEmail }) => {
      try {
        const room = [buyerEmail, sellerEmail].sort().join('--');
        socket.join(room);
        const messages = await getChatHistory(buyerEmail, sellerEmail);
        socket.emit('previousMessages', messages);
      } catch (error) {
        console.error('Error joining room:', error);
      }
    });

    socket.on('sendMessage', async (messageData) => {
      try {
        const message = await saveMessage(messageData);
        const room = [messageData.from, messageData.to].sort().join('--');
        io.to(room).emit('receiveMessage', message);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    socket.on('requestConversations', async (userEmail) => {
      try {
        const conversations = await getConversations(userEmail);
        socket.emit('conversations', conversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    });
    
    socket.on('markAsRead', async ({ room, userEmail }) => {
      try {
        console.log(`Marking messages as read in room ${room} for ${userEmail}`);
        await Message.updateMany(
          {
            room,
            to: userEmail,
            read: false
          },
          { $set: { read: true, readAt: new Date() } }
        );

        // Notify all clients in the room about the read status
        io.to(room).emit('messagesRead', { room, userEmail });
        
        // Refresh conversations for the current user only
        socket.emit('requestConversations', userEmail);
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    });
    socket.on('messagesRead', ({ room, userEmail }) => {
      io.to(room).emit('requestConversations', userEmail);
    });

  });
};