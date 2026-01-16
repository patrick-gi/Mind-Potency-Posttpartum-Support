
import React, { useState } from 'react';
import { SendIcon } from './icons/Icons';

interface InputBarProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Share what's on your mind..."
        className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C3A693] focus:outline-none resize-none"
        rows={1}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="p-3 bg-[#7C5E4A] text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#5B4F47] transition-colors"
      >
        <SendIcon className="w-6 h-6" />
      </button>
    </form>
  );
};
