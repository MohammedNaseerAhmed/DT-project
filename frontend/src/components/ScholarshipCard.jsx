import React from 'react';

export default function ScholarshipCard({ scholarship }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{scholarship.title}</h3>
        
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
            {scholarship.amount}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {scholarship.description}
        </p>

        {scholarship.requirements && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Requirements:</h4>
            <p className="text-gray-600 text-sm line-clamp-2">
              {scholarship.requirements}
            </p>
          </div>
        )}

        <div className="text-sm text-gray-500 mb-4">
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Deadline: {scholarship.deadline ? new Date(scholarship.deadline).toLocaleDateString() : "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100">
        {scholarship.link && (
          <a
            href={scholarship.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </a>
        )}
      </div>
    </div>
  );
}
