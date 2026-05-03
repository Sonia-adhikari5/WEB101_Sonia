import api from '@/lib/api-config';

export const createVideo = async (videoFile, thumbnailFile, caption) => {
  const formData = new FormData();
  formData.append('video', videoFile);
  formData.append('title', caption); // map caption to title
  if (thumbnailFile) {
    formData.append('thumbnail', thumbnailFile);
  }

  const response = await api.post('/videos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};