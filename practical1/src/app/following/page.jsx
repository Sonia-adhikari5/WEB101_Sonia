'use client';

import { useEffect, useState } from 'react';
import VideoCard from '@/components/ui/VideoCard';
import { getFollowingVideos } from '@/services/videoService';
import { useAuth } from '@/contexts/authContext';
import Link from 'next/link';

export default function FollowingPage() {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getFollowingVideos();
        setVideos(data);
      } catch (err) {
        setError('Failed to load videos.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchVideos();
    else setLoading(false);
  }, [user]);

  if (!user) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <p className="text-gray-500 text-lg">Login to see videos from people you follow</p>
      <Link href="/" className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600">
        Go Home
      </Link>
    </div>
  );

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-500 animate-pulse">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-red-500">{error}</p>
    </div>
  );

  if (videos.length === 0) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <p className="text-gray-500 text-lg">No videos yet from people you follow</p>
      <Link href="/explore-users" className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600">
        Explore Users
      </Link>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Following</h1>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}