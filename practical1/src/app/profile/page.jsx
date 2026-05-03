'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getUserProfile, followUser, unfollowUser } from '@/services/userService';
import VideoCard from '@/components/ui/VideoCard';
import { useAuth } from '@/contexts/authContext';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(userId);
        setProfile(data);
      } catch (err) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleFollow = async () => {
    if (!user) {
      toast.error('Please login to follow users');
      return;
    }
    try {
      if (profile.isFollowing) {
        await unfollowUser(profile.id);
        toast.success(`Unfollowed ${profile.username}`);
      } else {
        await followUser(profile.id);
        toast.success(`Following ${profile.username}`);
      }
      setProfile({ ...profile, isFollowing: !profile.isFollowing });
    } catch (err) {
      toast.error('Action failed. Try again.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-500 animate-pulse">Loading profile...</p>
    </div>
  );

  if (!profile) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-red-500">User not found</p>
    </div>
  );

  const isOwnProfile = user?.id === profile.id;

  return (
    <div className="max-w-xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-red-400 flex items-center justify-center text-white text-3xl font-bold">
          {profile.username?.[0]?.toUpperCase()}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{profile.username}</h1>
          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span><strong>{profile._count?.videos || 0}</strong> videos</span>
            <span><strong>{profile._count?.followers || 0}</strong> followers</span>
            <span><strong>{profile._count?.following || 0}</strong> following</span>
          </div>
        </div>
        {!isOwnProfile && user && (
          <button
            onClick={handleFollow}
            className={`px-4 py-2 rounded font-semibold text-sm ${
              profile.isFollowing
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {profile.isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>

      {/* User's Videos */}
      <h2 className="text-xl font-bold mb-4">Videos</h2>
      {profile.videos?.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No videos yet</p>
      ) : (
        profile.videos?.map((video) => (
          <VideoCard key={video.id} video={{ ...video, user: profile }} />
        ))
      )}
    </div>
  );
}