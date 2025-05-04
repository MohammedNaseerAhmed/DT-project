import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img src={book.imageUrl} alt={book.title} className="h-40 w-full object-cover rounded" />
      <span className="mt-2 text-xs bg-gray-200 px-2 py-1 rounded">{book.genre}</span>
      <h3 className="mt-2 font-bold text-lg">{book.title}</h3>
      <p className="text-gray-600 text-sm">{book.description}</p>
      <p className="text-xs mt-1">By {book.author}</p>
      {book.tags && (
        <div className="flex flex-wrap gap-1 mt-2">
          {book.tags.map(tag => (
            <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>
      )}
      <div className="flex gap-2 mt-2">
        <button className="border px-2 py-1 rounded text-xs">View</button>
        <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Download</button>
      </div>
    </div>
  );
}