import React from 'react';
import ChatInterface from '../components/ChatInterface';
import { useParams } from 'react-router-dom';


const Chat: React.FC = () => {
  const { characterId } = useParams<{characterId: string}>();

  return (
    <div className="chat-page">
     {characterId && <ChatInterface characterId={characterId} />}
    </div>
  );
};

export default Chat;