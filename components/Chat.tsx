"use client";

import { useState, useCallback } from 'react';
import { MessageBubble } from './ui/message-bubble';
import { LoadingDots } from './ui/loading-dots';
import { ChatHeader } from './chat-header';
import { ChatInput } from './chat-input';
import { sendMessage } from '@/lib/chat-service';
import { Message } from '@/types/chat';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (!trimmedInput || isLoading) return;

    const newMessage: Message = { role: 'user', content: trimmedInput };
    
    try {
      setIsLoading(true);
      setError(null);
      setInput('');
      setMessages(prev => [...prev, newMessage]);

      const response = await sendMessage([...messages, newMessage]);
      
      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.message) {
        setMessages(prev => [...prev, response.message]);
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg shadow-xl bg-white dark:bg-gray-800 overflow-hidden">
      <ChatHeader />

      <div className="h-[600px] overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            Start a conversation by typing a message below.
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble key={`${message.role}-${index}`} {...message} />
          ))
        )}
        
        {isLoading && <LoadingDots />}
        
        {error && (
          <div className="p-4 text-center text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
            {error}
          </div>
        )}
      </div>

      <ChatInput
        input={input}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onInputChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}