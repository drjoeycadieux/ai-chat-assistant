"use client";

import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ChatInput({ input, isLoading, onSubmit, onInputChange }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t dark:border-gray-700">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={onInputChange}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg border dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}