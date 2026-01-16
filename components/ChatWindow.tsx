
import React from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { InputBar } from './InputBar';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, isLoading }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length - 1]?.sender === 'user' && (
          <MessageBubble message={{ id: 0, sender: 'ai', text: '...' }} />
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-100">
        <InputBar onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};
