import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ sender: 'bot', text: 'Hello! How can I help you today?' }]);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Update the messages with the user input
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4', // Use 'gpt-3.5-turbo' if your account doesn't support GPT-4
          messages: newMessages.map((msg) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text,
          })),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`, // Replace with your OpenAI API key
          },
        }
      );

      // Append AI response
      setMessages([
        ...newMessages,
        { sender: 'bot', text: response.data.choices[0].message.content },
      ]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setMessages([...newMessages, { sender: 'bot', text: 'Error occurred!' }]);
    }

    setInput('');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      {isOpen ? (
        <div style={{
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px',
          borderRadius: '12px',
          width: '300px',
          backgroundColor: '#161616',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          marginBottom: '60px'
        }}>
          <div style={{ 
            maxHeight: '400px', 
            overflowY: 'auto', 
            marginBottom: '16px'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  margin: '8px 0',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: msg.sender === 'user' 
                    ? 'rgba(0, 242, 254, 0.1)'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message"
            style={{ 
              width: '100%', 
              padding: '10px', 
              marginBottom: '8px', 
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              outline: 'none'
            }}
          />
          <button 
            onClick={handleSendMessage} 
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '8px',
              background: 'linear-gradient(to right, #00f2fe, #ff00e5)',
              border: 'none',
              color: '#000',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}
          >
            Send
          </button>
        </div>
      ) : null}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(to right, #00f2fe, #ff00e5)',
          border: 'none',
          boxShadow: '0 2px 20px rgba(0, 242, 254, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0F0F0F',
          fontSize: '24px',
          transition: 'transform 0.2s, opacity 0.2s'
        }}
        onMouseOver={e => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.opacity = '1';
        }}
      >
        {isOpen ? '×' : '💬'}
      </button>
    </div>
  );
};

export default Chatbot;