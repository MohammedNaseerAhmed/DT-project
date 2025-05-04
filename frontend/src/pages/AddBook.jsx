import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

export default function AddBook() {
  const [form, setForm] = useState({ title: '', author: '', genre: '', description: '', imageUrl: '', tags: '' });
  const { getToken } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await getToken();
    console.log("Auth token:", token); // Add this line

    try {
      await axios.post(
        'http://localhost:5000/api/books',
        { ...form, tags: form.tags.split(',') },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Book added!');
    } catch (err) {
      alert('Error adding book');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Book</h2>
      <input name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 border mb-2" required />
      <input name="author" placeholder="Author" onChange={handleChange} className="w-full p-2 border mb-2" required />
      <input name="genre" placeholder="Genre" onChange={handleChange} className="w-full p-2 border mb-2" required />
      <input name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border mb-2" required />
      <input name="imageUrl" placeholder="Image URL" onChange={handleChange} className="w-full p-2 border mb-2" />
      <input name="tags" placeholder="Tags (comma separated)" onChange={handleChange} className="w-full p-2 border mb-2" />
      <button type="submit" className="w-full bg-blue-600 text-white p-2">Add Book</button>
    </form>
  );
}
