// chatSocket.js
import { getChatHistory, saveMessage, getRoomId, getConversations  } from '../Controllers/messageChat.js';

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
  });
};