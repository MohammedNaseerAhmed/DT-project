import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScholarshipCard from '../components/ScholarshipCard';
import { getAllScholarships } from '../api/scholarships';

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const data = await getAllScholarships();
        setScholarships(data);
      } catch (err) {
        setError('Failed to load scholarships');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading scholarships...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Scholarships</h2>
        <Link
          to="/scholarships/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Scholarship
        </Link>
      </div>

      {scholarships.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No scholarships available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map(scholarship => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))}
        </div>
      )}
    </div>
  );
}
