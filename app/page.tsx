import Chat from '@/components/Chat';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">AI Chat Assistant</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Powered by OpenAI GPT-3.5</p>
        <Chat />
      </div>
    </main>
  );
}