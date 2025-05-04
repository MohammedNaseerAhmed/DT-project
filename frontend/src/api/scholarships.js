import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api/scholarships';

export const getAllScholarships = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addScholarship = async (scholarshipData, token) => {
  const res = await axios.post(BASE_URL, scholarshipData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
