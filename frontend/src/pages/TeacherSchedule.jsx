import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { updateTeacherSchedule } from '../api/teachers';
import { Link } from 'react-router-dom';
import TeacherProfileCard from '../components/TeacherProfileCard';
import axios from 'axios';

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'History',
  'Geography',
  'Computer Science',
  'Economics',
  'Other',
];

export default function TeacherSchedule() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [freeTime, setFreeTime] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [experience, setExperience] = useState(1);
  const [teacherData, setTeacherData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Fetch the logged-in teacher's data
  const fetchTeacherData = async () => {
    try {
      const token = await getToken();
      const res = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeacherData(res.data);
      setSubject(res.data.subject || 'Mathematics');
      setExperience(res.data.experience || 1);
      setFreeTime(res.data.freeTime ? res.data.freeTime.join(', ') : '');
    } catch (err) {
      setError('Failed to load profile data');
    }
  };

  useEffect(() => {
    fetchTeacherData();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const token = await getToken();
      // Update schedule
      await updateTeacherSchedule(freeTime.split(',').map(s => s.trim()), token);
      // Update subject and experience
      await axios.patch('http://localhost:5000/api/users/profile', { subject, experience }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(true);
      fetchTeacherData(); // Refresh card data
    } catch (err) {
      setError(err.message || 'Error updating schedule');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow flex flex-col items-center gap-8">
      <TeacherProfileCard teacher={teacherData} />
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-2 mt-4">Update Your Free Time, Subject & Experience</h3>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
            {error.includes('teacher') && (
              <div className="mt-2">
                <Link to="/profile" className="text-blue-600 underline">
                  Go to Profile to update your role
                </Link>
              </div>
            )}
          </div>
        )}
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            Schedule, subject, and experience updated successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Free Time (comma separated)</label>
            <input
              name="freeTime"
              placeholder="e.g. Mondays 2-4pm, Wednesdays 10-12am"
              value={freeTime}
              onChange={e => setFreeTime(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <select
              className="w-full p-2 border rounded text-gray-700"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            >
              {SUBJECTS.map(subj => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
            <input
              type="number"
              min={1}
              max={50}
              className="w-full p-2 border rounded text-gray-700"
              value={experience}
              onChange={e => setExperience(Number(e.target.value))}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
          >
            Update Schedule
          </button>
        </form>
      </div>
    </div>
  );
}
