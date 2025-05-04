import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { addCourse } from '../api/courses';
import { Link } from 'react-router-dom';

export default function AddCourse() {
  const { getToken } = useAuth();
  const [form, setForm] = useState({ title: '', description: '', resources: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    try {
      const token = await getToken();
      await addCourse({ ...form, resources: form.resources.split(',') }, token);
      setSuccess(true);
      setForm({ title: '', description: '', resources: '' });
    } catch (err) {
      setError(err.message || 'Error adding course');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Course</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
          {error.includes('course_provider') && (
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
          Course added successfully!
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
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" 
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Resources (comma separated URLs)</label>
          <input 
            name="resources" 
            value={form.resources} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}
