// chatSocket.js
import { getChatHistory, saveMessage, getRoomId } from '../Controllers/messageChat.js';

export const configureSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinRoom', async ({ buyerEmail, sellerEmail }) => {
      try {
        const room = getRoomId(buyerEmail, sellerEmail);
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
        const room = getRoomId(messageData.from, messageData.to);
        io.to(room).emit('receiveMessage', message);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });
  });
};