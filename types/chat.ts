export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message?: {
    role: 'assistant';
    content: string;
  };
  error?: string;
  status: number;
}

export interface ChatRequest {
  messages: Message[];
}