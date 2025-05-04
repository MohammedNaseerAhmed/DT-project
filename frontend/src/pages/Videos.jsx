import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import { getAllVideos } from '../api/videos';

export default function Videos() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getAllVideos().then(setVideos).catch(console.error);
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Educational Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map(video => <VideoCard key={video._id} video={video} />)}
      </div>
    </div>
  );
}
