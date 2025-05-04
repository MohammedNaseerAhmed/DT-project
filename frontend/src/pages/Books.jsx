import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { getAllBooks } from '../api/books';

export default function Books() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getAllBooks().then(setBooks).catch(console.error);
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Educational Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => <BookCard key={book._id} book={book} />)}
      </div>
    </div>
  );
}
