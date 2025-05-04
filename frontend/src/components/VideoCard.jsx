import React from 'react';

export default function VideoCard({ video }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="aspect-w-16 aspect-h-9 mb-2">
        {video.url ? (
          <iframe
            src={video.url}
            title={video.title}
            allowFullScreen
            className="w-full h-40 rounded"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-500">No video available</span>
          </div>
        )}
      </div>
      <span className="mt-2 text-xs bg-gray-200 px-2 py-1 rounded">{video.subject}</span>
      <h3 className="mt-2 font-bold text-lg">{video.title}</h3>
      <p className="text-gray-600 text-sm">{video.description}</p>
      <p className="text-xs mt-1">By {video.uploadedBy?.name || "Unknown"}</p>
    </div>
  );
}
