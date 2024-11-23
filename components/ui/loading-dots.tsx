"use client";

export function LoadingDots() {
  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.8s'
          }}
        />
      ))}
    </div>
  );
}