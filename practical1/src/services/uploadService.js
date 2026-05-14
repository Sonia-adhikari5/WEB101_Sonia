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
import supabase from '../lib/supabase';

export const uploadVideo = async (file) => {
  const filePath = `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage
    .from('videos')
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from('videos').getPublicUrl(filePath);
  return { url: data.publicUrl, path: filePath };
};

export const uploadThumbnail = async (file) => {
  const filePath = `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage
    .from('thumbnails')
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from('thumbnails').getPublicUrl(filePath);
  return { url: data.publicUrl, path: filePath };
};