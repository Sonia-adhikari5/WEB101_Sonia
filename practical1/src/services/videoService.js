import api from '@/lib/api-config';

// Fetch all videos (for the For You page)
export const getAllVideos = async () => {
  const response = await api.get('/videos');
  return response.data;
};

// Fetch videos from followed users
export const getFollowingVideos = async () => {
  const response = await api.get('/videos/following');
  return response.data;
};

// Fetch a single video by ID
export const getVideoById = async (id) => {
  const response = await api.get(`/videos/${id}`);
  return response.data;
};

// Upload a new video
export const uploadVideo = async (formData) => {
  const response = await api.post('/videos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Like or unlike a video
export const toggleLike = async (videoId) => {
  const response = await api.post(`/videos/${videoId}/like`);
  return response.data;
};

// Get comments for a video
export const getComments = async (videoId) => {
  const response = await api.get(`/videos/${videoId}/comments`);
  return response.data;
};

// Post a comment on a video
export const postComment = async (videoId, content) => {
  const response = await api.post(`/videos/${videoId}/comments`, { content });
  return response.data;
};