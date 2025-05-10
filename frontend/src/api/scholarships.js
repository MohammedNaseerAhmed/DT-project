import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api/scholarships';

export const getAllScholarships = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch scholarships');
    }
    throw new Error('Network error. Please check your connection.');
  }
};

export const addScholarship = async (scholarshipData, token) => {
  try {
    const res = await axios.post(BASE_URL, scholarshipData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Please login to add a scholarship');
      }
      if (error.response.status === 403) {
        throw new Error('You do not have permission to add scholarships');
      }
      throw new Error(error.response.data.message || 'Failed to add scholarship');
    }
    throw new Error('Network error. Please check your connection.');
  }
};
