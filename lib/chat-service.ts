import { ChatRequest, ChatResponse } from '@/types/chat';

export async function sendMessage(messages: ChatRequest['messages']): Promise<ChatResponse> {
  try {
    if (!messages || messages.length === 0) {
      throw new Error('No messages provided');
    }

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      message: data.message,
      status: data.status,
      error: data.error
    };
  } catch (error) {
    console.error('Chat service error:', error);
    return {
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      status: 500
    };
  }
}