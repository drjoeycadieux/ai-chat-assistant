import { MessageSquare } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="flex items-center gap-2 p-4 border-b dark:border-gray-700">
      <MessageSquare className="w-6 h-6 text-blue-500" />
      <h2 className="text-xl font-semibold">Chat</h2>
    </div>
  );
}