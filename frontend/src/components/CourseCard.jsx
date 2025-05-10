import React from 'react';

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-lg max-w-320px h-320px shadow p-4 flex flex-col">
      <h3 className="mt-2 font-bold text-lg">{course.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-5 overflow-hidden">{course.description}</p>
      <p className="text-xs mt-1">By {course.provider?.name || "Unknown"}</p>
      {course.resources && (
        <div className="flex flex-wrap gap-1 mt-2">
          {course.resources.map((res, idx) => (
            <a key={idx} href={res} className="text-xs text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              Resource {idx + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
