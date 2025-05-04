import React from 'react';

export default function ScholarshipCard({ scholarship }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <h3 className="mt-2 font-bold text-lg">{scholarship.title}</h3>
      <p className="text-gray-600 text-sm">{scholarship.description}</p>
      <p className="text-xs mt-1">Deadline: {scholarship.deadline ? new Date(scholarship.deadline).toLocaleDateString() : "N/A"}</p>
      {scholarship.link && (
        <a href={scholarship.link} className="text-blue-600 underline mt-2" target="_blank" rel="noopener noreferrer">
          More Info
        </a>
      )}
    </div>
  );
}
