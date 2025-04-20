// components/ChatBox.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Send, ArrowLeft } from "lucide-react";

const socket = io('http://localhost:3000');

const ChatBox = ({ sellerEmail, buyerEmail, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', { buyerEmail, sellerEmail });

    socket.on('previousMessages', (messages) => {
      setMessages(messages);
    });

    socket.on('receiveMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('previousMessages');
    };
  }, [buyerEmail, sellerEmail]);

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const message = {
      from: buyerEmail,
      to: sellerEmail,
      content: input,
      timestamp: new Date(),
    };
    
    socket.emit('sendMessage', message);
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-xl border border-gray-300 rounded-lg w-80 z-50 h-96 flex flex-col">
      <div className="bg-orange-300 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">
        <button><ArrowLeft /></button>
        <span>Chat with Seller</span>
        <button onClick={onClose} className="text-white font-bold w-8 bg-orange-200 hover:bg-orange-500">×</button>
      </div>
      
      <div className="p-2 flex-1 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`px-2 py-1 rounded-lg max-w-[70%] ${
              msg.from === buyerEmail 
                ? 'bg-orange-100 ml-auto' 
                : 'bg-gray-100 mr-auto'
            }`}
          >
            <div className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex items-center border-t p-2">
        <input
          className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button 
          onClick={sendMessage} 
          className="ml-2 p-2 text-orange-600 hover:text-orange-700"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;