'use client';

import { useEffect, useState } from 'react';
import { getAllUsers, followUser, unfollowUser } from '@/services/userService';
import { useAuth } from '@/contexts/authContext';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ExploreUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleFollow = async (targetUser) => {
    if (!user) {
      toast.error('Please login to follow users');
      return;
    }
    try {
      if (targetUser.isFollowing) {
        await unfollowUser(targetUser.id);
        toast.success(`Unfollowed ${targetUser.username}`);
      } else {
        await followUser(targetUser.id);
        toast.success(`Following ${targetUser.username}`);
      }
      // Update local state
      setUsers(users.map(u =>
        u.id === targetUser.id
          ? { ...u, isFollowing: !u.isFollowing }
          : u
      ));
    } catch (err) {
      toast.error('Action failed. Try again.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-500 animate-pulse">Loading users...</p>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Explore Users</h1>
      <div className="flex flex-col gap-4">
        {users
          .filter(u => u.id !== user?.id) // Don't show yourself
          .map((u) => (
            <div key={u.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <Link href={`/profile/${u.id}`} className="flex items-center gap-3 hover:text-red-500">
                <div className="w-10 h-10 rounded-full bg-red-400 flex items-center justify-center text-white font-bold">
                  {u.username?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{u.username}</p>
                  <p className="text-sm text-gray-500">{u._count?.videos || 0} videos</p>
                </div>
              </Link>
              {user && (
                <button
                  onClick={() => handleFollow(u)}
                  className={`px-4 py-1.5 rounded font-semibold text-sm ${
                    u.isFollowing
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {u.isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}