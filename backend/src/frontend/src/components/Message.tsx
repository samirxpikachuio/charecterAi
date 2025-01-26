import React from 'react';
import { Message } from '../types';

interface MessageProps {
  message: Message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
    const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        });
  return (
    <div className={`message ${message.role}`}>
      <p>{message.content}</p>
      <span className="timestamp">{formattedTime}</span>
    </div>
  );
};

export default Message;