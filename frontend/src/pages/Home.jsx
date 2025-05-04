import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Empowering Students with Smarter Learning Solutions</h1>
      <p className="text-lg text-gray-600 mb-8">
        Access free educational resources, connect with expert teachers, and stay updated with scholarship opportunities.
      </p>
      <input
        className="border rounded px-4 py-2 w-full max-w-lg"
        placeholder="Search for books, videos, courses..."
      />
    </div>
  );
}