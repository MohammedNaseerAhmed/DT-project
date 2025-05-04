import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { addVideo } from '../api/videos';
import { Link } from 'react-router-dom';

export default function AddVideo() {
  const { getToken } = useAuth();
  const [form, setForm] = useState({ title: '', url: '', description: '', subject: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    try {
      const token = await getToken();
      await addVideo(form, token);
      setSuccess(true);
      setForm({ title: '', url: '', description: '', subject: '' });
    } catch (err) {
      setError(err.message || 'Error adding video');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Video</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
          {error.includes('teacher') && (
            <div className="mt-2">
              <Link to="/profile" className="text-blue-600 underline">
                Go to Profile to update your role
              </Link>
            </div>
          )}
        </div>
      )}

      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          Video added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" 
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Video URL</label>
          <input 
            name="url" 
            value={form.url} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" 
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input 
            name="subject" 
            value={form.subject} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" 
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add Video
        </button>
      </form>
    </div>
  );
}
