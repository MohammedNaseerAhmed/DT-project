import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api/teachers';

export const getAllTeachers = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const updateTeacherSchedule = async (freeTime, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/schedule`, { freeTime }, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('You need to be a teacher to update your schedule. Please update your role in your profile.');
    }
    throw error;
  }
};
