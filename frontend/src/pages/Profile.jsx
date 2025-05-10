import React, { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';

const Profile = () => {
  const { getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        if (!token) {
          throw new Error('Authentication required');
        }

        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('Profile response:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        if (error.response) {
          setError(error.response.data.message || 'Failed to load profile');
        } else {
          setError('Failed to load profile. Please try again later.');
        }
      }
    };
    fetchProfile();
  }, [getToken]);

  const updateRole = async (newRole) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      console.log('Updating role to:', newRole);
      console.log('Current user state:', user);
      
      // Ensure role is a string and trim any whitespace
      const requestData = { role: String(newRole).trim() };
      console.log('Request data:', requestData);

      const response = await axios.patch(
        'http://localhost:5000/api/users/profile',
        requestData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
          }
        }
      );
      console.log('Role update response:', response.data);

      if (response.status === 400) {
        throw new Error(response.data.message || 'Failed to update role');
      }

      setUser(prevUser => ({ ...prevUser, role: response.data.role }));
      setSuccess(response.data.message);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating role:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        setError(error.response.data.message || 'Failed to update role');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('Network error. Please check your connection.');
      } else {
        console.error('Error message:', error.message);
        setError(error.message || 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg">
          {success}
        </div>
      )}

      {clerkUser ? (
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {clerkUser.fullName || 'Not set'}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {clerkUser.primaryEmailAddress?.emailAddress || 'Not set'}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Current Role:</span>{' '}
              <span className="capitalize">{user?.role || 'student'}</span>
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Change Role</h3>
            <div className="space-y-3">
              <button
                onClick={() => updateRole('teacher')}
                disabled={loading || user?.role === 'teacher'}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Switch to Teacher Role'}
              </button>
              <button
                onClick={() => updateRole('course_provider')}
                disabled={loading || user?.role === 'course_provider'}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Switch to Course Provider Role'}
              </button>
              <button
                onClick={() => updateRole('scholarship_provider')}
                disabled={loading || user?.role === 'scholarship_provider'}
                className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Switch to Scholarship Provider Role'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      )}
    </div>
  );
};

export default Profile;