
import React from 'react';
import { Message } from '../types';
import { UserIcon, SparklesIcon } from './icons/Icons';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const typingIndicator = (
    <div className="flex items-center space-x-1">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
    </div>
  );

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EAE2D8] flex items-center justify-center">
            <SparklesIcon className="w-6 h-6 text-[#7C5E4A]" />
        </div>
      )}
      <div
        className={`max-w-md lg:max-w-2xl px-5 py-3 rounded-2xl shadow-sm ${
          isUser
            ? 'bg-[#7C5E4A] text-white rounded-br-lg'
            : 'bg-gray-100 text-[#5B4F47] rounded-bl-lg'
        }`}
      >
        {message.text === '...' ? typingIndicator : 
          <p className="whitespace-pre-wrap">{message.text}</p>
        }
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#7C5E4A] flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-white" />
        </div>
      )}
    </div>
  );
};
