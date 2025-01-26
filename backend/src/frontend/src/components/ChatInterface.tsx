import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import { Message } from '../types';
import MessageComponent from './Message';
import { useParams } from 'react-router-dom';

interface ChatInterfaceProps {
  characterId: string
}
const ChatInterface: React.FC<ChatInterfaceProps> = ({ characterId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
      const fetchConversation = async () => {
        if (id)
        {
            try {
                const res = await api.get(`/conversations/${id}`)
                setMessages(res.data.messages);
                setConversationId(res.data.id)
            } catch (error: any) {
                console.error(error)
            }
        }
      }
    fetchConversation()
  }, [id]);

    useEffect(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

  const handleSend = async () => {
      const userMessage: Message = { role: 'user', content: input, timestamp: new Date().toISOString() };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput('');

      let url = `/conversations/${conversationId}/messages`
      if (!conversationId)
      {
         url = `/conversations/`
      }
      try {
        const res = await api.post(url, {
            content: input,
            characterId,
        });
          setConversationId(res.data.id || conversationId);
          setMessages([...newMessages, res.data.message]);
      } catch (error: any) {
        console.error(error)
        alert(error?.response?.data?.message || "Failed to send message");
        setMessages(messages);
      }
  };

  return (
    <div className="chat-container">
      <div className="message-history">
        {messages.map((msg, i) => (
          <MessageComponent key={i} message={msg} />
        ))}
          <div ref={messageEndRef} />
      </div>
      <div className="input-area">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;