import React from 'react';

export default function BookCard({ book }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col w-full max-w-xs h-[420px] overflow-hidden">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="h-40 w-full object-contain rounded"
      />
      <span className="mt-2 text-xs bg-gray-200 px-2 py-1 rounded w-fit">
        {book.genre}
      </span>
      <h3 className="mt-2 font-bold text-lg truncate">{book.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3 overflow-hidden">
        {book.description}
      </p>
      <p className="text-xs mt-1 text-gray-500">By {book.author}</p>

      {book.tags && (
        <div className="flex flex-wrap gap-1 mt-2 overflow-hidden">
          {book.tags.map(tag => (
            <span
              key={tag}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-auto pt-2">
        <button className="border px-2 py-1 rounded text-xs hover:bg-gray-100">
          View
        </button>
        <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">
          Download
        </button>
      </div>
    </div>
  );
}
