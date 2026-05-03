'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/authContext';
import { toggleLike } from '@/services/videoService';
import toast from 'react-hot-toast';

export default function VideoCard({ video }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(video.isLiked || false);
  const [likeCount, setLikeCount] = useState(video._count?.likes || 0);

  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like videos');
      return;
    }
    try {
      await toggleLike(video.id);
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    } catch (err) {
      toast.error('Failed to like video');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      {/* User info */}
      <div className="flex items-center gap-3 mb-3">
        <Link href={`/profile/${video.user?.id}`}>
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white bg-red-400">
            {video.user?.username?.[0]?.toUpperCase() || '?'}
          </div>
        </Link>
        <Link href={`/profile/${video.user?.id}`} className="font-semibold hover:text-red-500">
          {video.user?.username || 'Unknown'}
        </Link>
      </div>

      {/* Caption */}
      <p className="mb-3 text-gray-700">{video.caption}</p>

      {/* Video player */}
      <video
        src={video.url}
        controls
        className="w-full rounded-lg max-h-96 bg-black"
        loop
      />

      {/* Interaction buttons */}
      <div className="flex items-center gap-6 mt-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 font-medium ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
        >
          {liked ? '❤️' : '🤍'} {likeCount}
        </button>

        <Link
          href={`/video/${video.id}`}
          className="flex items-center gap-1 text-gray-500 hover:text-red-500 font-medium"
        >
          💬 {video._count?.comments || 0}
        </Link>
      </div>
    </div>
  );
}