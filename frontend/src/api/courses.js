import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api/courses';

export const getAllCourses = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addCourse = async (courseData, token) => {
  try {
    const res = await axios.post(BASE_URL, courseData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('You need to be a course provider to add courses. Please update your role in your profile.');
    }
    throw error;
  }
};
