import React, { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';

const Profile = () => {
  const { getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load profile');
      }
    };
    fetchProfile();
  }, [getToken]);

  const updateRole = async (newRole) => {
    try {
      const token = await getToken();
      await axios.patch('http://localhost:5000/api/users/profile', { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser({ ...user, role: newRole });
      setSuccess('Role updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating role:', error);
      setError('Failed to update role');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {clerkUser ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-gray-700"><span className="font-semibold">Name:</span> {clerkUser.fullName || 'Not set'}</p>
            <p className="text-gray-700"><span className="font-semibold">Email:</span> {clerkUser.primaryEmailAddress?.emailAddress || 'Not set'}</p>
            <p className="text-gray-700"><span className="font-semibold">Role:</span> {user?.role || 'student'}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Request New Role</p>
            <div className="space-y-2">
              {user?.role !== 'teacher' && (
                <button
                  onClick={() => updateRole('teacher')}
                  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Request Teacher Role
                </button>
              )}
              {user?.role !== 'course_provider' && (
                <button
                  onClick={() => updateRole('course_provider')}
                  className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
                >
                  Request Course Provider Role
                </button>
              )}
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