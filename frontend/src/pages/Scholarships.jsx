import React, { useEffect, useState } from 'react';
import ScholarshipCard from '../components/ScholarshipCard';
import { getAllScholarships } from '../api/scholarships';

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  useEffect(() => {
    getAllScholarships().then(setScholarships).catch(console.error);
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Scholarships</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {scholarships.map(scholarship => <ScholarshipCard key={scholarship._id} scholarship={scholarship} />)}
      </div>
    </div>
  );
}
