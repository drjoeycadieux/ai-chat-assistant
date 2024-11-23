import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { ChatRequest, ChatResponse } from '@/types/chat';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body as ChatRequest;

    if (!messages?.length) {
      return NextResponse.json<ChatResponse>({
        error: 'Messages array is required',
        status: 400
      }, { status: 400 });
    }

    const validMessages = messages.every(msg => 
      msg && 
      typeof msg.content === 'string' && 
      (msg.role === 'user' || msg.role === 'assistant')
    );

    if (!validMessages) {
      return NextResponse.json<ChatResponse>({
        error: 'Invalid message format',
        status: 400
      }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages.map(({ role, content }) => ({
        role,
        content,
      })),
      temperature: 0.7,
      max_tokens: 1000,
    });

    const message = completion.choices[0]?.message;

    if (!message?.content) {
      throw new Error('No response from OpenAI');
    }

    return NextResponse.json<ChatResponse>({
      message: {
        role: 'assistant',
        content: message.content
      },
      status: 200
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred';

    return NextResponse.json<ChatResponse>({
      error: errorMessage,
      status: 500
    }, { status: 500 });
  }
}