"use client";

import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';

export function MessageBubble({ role, content }: Message) {
  const isUser = role === 'user';

  return (
    <div className={cn(
      "flex w-full",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-2",
        isUser ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700",
        "shadow-sm"
      )}>
        <p className="whitespace-pre-wrap break-words">
          {content}
        </p>
      </div>
    </div>
  );
}