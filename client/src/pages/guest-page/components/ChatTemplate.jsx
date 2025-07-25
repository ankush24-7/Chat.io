import React from 'react';

const ChatTemplate = () => {
  const messages = [
    { id: 1, text: "Hey! How's your day going? 😊", sender: 'right' },
    { id: 2, text: "Pretty good! Just checking out this new chat app", sender: 'left' },
    { id: 3, text: "Chat.io is amazing! Super fast and clean interface", sender: 'right' },
    { id: 4, text: "I love how smooth everything feels ✨", sender: 'left' }
  ];

  const TypingIndicator = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
    </div>
  );

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-80 h-96 mx-auto">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`absolute max-w-64 p-4 min-h-16 rounded-2xl ${
              message.sender === 'right'
                ? 'bg-gradient-to-r from-blue-500 to-accent-right text-white right-0 rounded-br-lg'
                : 'bg-white text-gray-800 left-0 rounded-bl-lg shadow-lg'
            }`}
            style={{ 
              top: `${50 + (index * 70)}px`,
            }}
          >
            <p className="text-sm font-medium leading-relaxed">{message.text}</p>
          </div>
        ))}
        
        <div 
          className="absolute left-0 bg-white text-gray-800 p-4 rounded-2xl rounded-bl-lg shadow-lg"
          style={{ top: '330px' }}
        >
          <TypingIndicator />
        </div>
      </div>
    </div>
  );
};

export default ChatTemplate;