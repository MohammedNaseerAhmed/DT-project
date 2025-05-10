import React from 'react';
import './VideoCard.css';

export default function VideoCard({ video }) {
  return (
    <div className="card video-card">
      <div className="video-preview">
        {video.url ? (
          <iframe
            src={video.url}
            title={video.title}
            allowFullScreen
            className="video-frame h-40 w-full object-contain rounded"
          />
        ) : (
          <div className="video-placeholder">
            <span>No video available</span>
          </div>
        )}
      </div>
      <span className="badge">{video.subject}</span>
      <h3 className="card-title">{video.title}</h3>
      <p className="card-description line-clamp-3 overflow-hidden">{video.description}</p>

    </div>
  );
}
