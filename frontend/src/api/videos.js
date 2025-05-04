import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api/videos';

export const getAllVideos = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addVideo = async (videoData, token) => {
  try {
    const res = await axios.post(BASE_URL, videoData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('You need to be a teacher to add videos. Please update your role in your profile.');
    }
    throw error;
  }
};
