import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Send, ArrowLeft, MessageSquare } from "lucide-react";

const socket = io('http://localhost:3000');

const ChatBox = ({ onClose, sellerEmail }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showConversationList, setShowConversationList] = useState(false); // Start with conversation view
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const userEmail = userData?.email || userData?.user?.email;
    setCurrentUser(userEmail);

    const initializeChat = (userEmail) => {
      socket.emit('requestConversations', userEmail);

      socket.once('conversations', (existingConversations) => {
        setConversations(existingConversations);

        if (sellerEmail) {
          const roomId = [userEmail, sellerEmail].sort().join('--');

          const existingConv = existingConversations.find(conv =>
            conv.id === roomId ||
            ((conv.buyerEmail === userEmail && conv.sellerEmail === sellerEmail) ||
             (conv.sellerEmail === userEmail && conv.buyerEmail === sellerEmail))
          );

          const conversationToUse = existingConv || {
            id: roomId,
            buyerEmail: userEmail,
            sellerEmail: sellerEmail,
            otherUser: sellerEmail,
            
          };

          setSelectedConversation(conversationToUse);
          socket.emit('joinRoom', {
            buyerEmail: conversationToUse.buyerEmail,
            sellerEmail: conversationToUse.sellerEmail
          });
        }
      });
    };

    socket.on('previousMessages', (msgs) => {
      setMessages(msgs);
    });

    socket.on('receiveMessage', (message) => {
      setMessages(prev => [...prev, message]);
      socket.emit('requestConversations', userEmail);
    });

    initializeChat(userEmail);

    return () => {
      socket.off('receiveMessage');
      socket.off('previousMessages');
      socket.off('conversations');
    };
  }, [sellerEmail]);

  const sendMessage = () => {
    if (!input.trim() || !selectedConversation) return;
    const message = {
      from: currentUser,
      to: selectedConversation.otherUser,
      content: input,
      timestamp: new Date(),
    };
    socket.emit('sendMessage', message);
    setInput('');
  };

  const handleConversationSelect = (conv) => {
    setSelectedConversation(conv);
    setShowConversationList(false);
    socket.emit('joinRoom', {
      buyerEmail: conv.buyerEmail,
      sellerEmail: conv.sellerEmail
    });
  };

  const getParticipant = (conv) => {
    if (!conv) return 'Loading...';
    return conv.otherUser ||
      (currentUser === conv.buyerEmail ? conv.sellerEmail : conv.buyerEmail);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-xl border border-gray-300 rounded-lg w-80 z-50 h-96 flex flex-col">
      <div className="bg-orange-300 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">
        {!showConversationList ? (
          <button onClick={() => {
            setShowConversationList(true);
            socket.emit('requestConversations', currentUser);
          }}>
            <ArrowLeft size={20} />
          </button>
        ) : (
          <div className="w-6" />
        )}
        <span className="flex-1 text-center">
          {showConversationList ? 'Your Conversations' : getParticipant(selectedConversation)}
        </span>
        <button 
          onClick={onClose} 
          className="text-white font-bold w-8 bg-orange-200 hover:bg-orange-500 rounded"
        >
          ×
        </button>
      </div>

      {showConversationList ? (
        <div className="p-2 flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="text-center text-gray-500 p-4">No previous conversations</div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleConversationSelect(conv)}
                className="flex items-center p-2 hover:bg-orange-50 cursor-pointer rounded-lg"
              >
                <div className="bg-orange-100 p-2 rounded-full mr-2">
                  <MessageSquare size={18} className="text-orange-500" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium truncate">{getParticipant(conv)}</p>
                  <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(conv.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <>
          <div className="p-2 flex-1 overflow-y-auto space-y-2 text-sm">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 p-4">
                {selectedConversation?.lastMessage 
                  ? "No messages in this conversation" 
                  : `Start a new conversation with ${getParticipant(selectedConversation)}`}
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`px-2 py-1 rounded-lg max-w-[70%] ${
                    msg.from === currentUser
                      ? 'bg-orange-100 ml-auto'
                      : 'bg-gray-100 mr-auto'
                  }`}
                >
                  <div className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                  {msg.content}
                </div>
              ))
            )}
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
        </>
      )}
    </div>
  );
};

export default ChatBox;
