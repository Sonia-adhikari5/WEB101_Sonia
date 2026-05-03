'use client';

import { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { getAllVideos } from '@/services/videoService';

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        setVideos(data);
      } catch (err) {
        setError('Failed to load videos. Is your backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-500 animate-pulse">Loading videos...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-red-500">{error}</p>
    </div>
  );

  if (videos.length === 0) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-500">No videos yet. Be the first to upload!</p>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}