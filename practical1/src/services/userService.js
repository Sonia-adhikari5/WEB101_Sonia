import api from '@/lib/api-config';

// Get a user's profile by ID
export const getUserProfile = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// Get all users (for explore page)
export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Follow a user
export const followUser = async (userId) => {
  const response = await api.post(`/users/${userId}/follow`);
  return response.data;
};

// Unfollow a user
export const unfollowUser = async (userId) => {
  const response = await api.delete(`/users/${userId}/follow`);
  return response.data;
};

// Get followers of a user
export const getFollowers = async (userId) => {
  const response = await api.get(`/users/${userId}/followers`);
  return response.data;
};

// Get users that a user is following
export const getFollowing = async (userId) => {
  const response = await api.get(`/users/${userId}/following`);
  return response.data;
};