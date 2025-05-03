import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatBox from "./chatBox";
import { io } from 'socket.io-client';

const MessageIcon = ({ sellerEmail }) => {
  const [showChat, setShowChat] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const userEmail = userData?.email || userData?.user?.email;
    
    if (userEmail) {
      setCurrentUser(userEmail);

      const newSocket = io('http://localhost:3000', {
        reconnection: true,
        transports: ['websocket']
      });
      setSocket(newSocket);

      // Request initial conversations
      newSocket.emit('requestConversations', userEmail);

      // Handle incoming conversations
      newSocket.on('conversations', (conversations) => {
        console.log("Conversations received:", conversations);
        
        const counts = {};
        conversations.forEach(conv => {
          counts[conv.id] = conv.unreadCount || 0;
        });
        
        setUnreadCounts(counts);
        setConversations(conversations);
      });

      // Handle new messages
      newSocket.on('receiveMessage', (message) => {
        if (message.to === userEmail) {
          const room = [message.from, message.to].sort().join('--');
          setUnreadCounts(prev => ({
            ...prev,
            [room]: (prev[room] || 0) + 1
          }));
        }
      });

      // Handle read confirmations
      newSocket.on('messagesRead', ({ room }) => {
        setUnreadCounts(prev => ({
          ...prev,
          [room]: 0
        }));
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  const toggleChat = () => {
    // Simply toggle the chat visibility without marking as read
    setShowChat(prev => !prev);
  };

  const handleConversationSelect = (conversation) => {
    // Update UI immediately
    setSelectedConversation(conversation);
    
    // Only reset count if there were unread messages
    if (unreadCounts[conversation.id] > 0) {
      setUnreadCounts(prev => ({
        ...prev,
        [conversation.id]: 0
      }));
      
      // Notify server to mark as read
      socket?.emit('markAsRead', {
        room: conversation.id,
        userEmail: currentUser
      });
    }
  };

  const getParticipant = (conv) => {
    if (!conv) return 'Loading...';
    const participants = conv.id.split('--');
    return participants.find(email => email !== currentUser) || 'Unknown';
  };

  const totalUnread = Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleChat}
        className="relative p-3 bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg transition-all"
      >
        <MessageCircle size={24} className="text-white" />
        {totalUnread > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center font-bold">
            {totalUnread}
          </span>
        )}
      </button>

      {showChat && (
        <div className="bg-white rounded-lg shadow-xl w-80 fixed bottom-20 right-4 max-h-[70vh] overflow-hidden flex flex-col border border-gray-200">
          {selectedConversation ? (
            <ChatBox 
              onClose={() => setSelectedConversation(null)} 
              sellerEmail={getParticipant(selectedConversation)}
              currentUser={currentUser}
              socket={socket}
            />
          ) : (
            <>
              <div className="p-4 bg-orange-500 text-white">
                <h3 className="text-lg font-semibold">Your Conversations</h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <p className="text-gray-500 p-4">No conversations yet</p>
                ) : (
                  <ul className="divide-y">
                    {conversations.map((conversation) => {
                      const isUnread = unreadCounts[conversation.id] > 0;
                      return (
                        <li 
                          key={conversation.id}
                          onClick={() => handleConversationSelect(conversation)}
                          className={`p-3 hover:bg-orange-50 cursor-pointer transition-colors ${isUnread ? 'bg-orange-50' : ''}`}
                        >
                          <div className="flex items-center">
                            <div className="bg-orange-100 p-2 rounded-full mr-3">
                              <MessageCircle size={18} className="text-orange-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <p className={`truncate ${isUnread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                                  {getParticipant(conversation)}
                                </p>
                                {isUnread && (
                                  <span className="bg-red-500 text-white rounded-full text-xs px-2 py-1 font-bold">
                                    {unreadCounts[conversation.id]}
                                  </span>
                                )}
                              </div>
                              <p className={`text-sm truncate ${isUnread ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                                {conversation.lastMessage || 'No messages yet'}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(conversation.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageIcon;