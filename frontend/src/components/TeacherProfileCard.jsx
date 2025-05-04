import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
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

const TeacherProfileCard = ({ teacher, onProfileUpdate }) => {
  const { user } = useUser();
  const isOwnProfile = teacher && user && (
    (teacher.fullName === user.fullName || teacher.name === user.fullName) ||
    teacher.email === user.primaryEmailAddress?.emailAddress
  );

  // Local state for editing only
  const [editSubject, setEditSubject] = useState('');
  const [editExperience, setEditExperience] = useState(1);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  // Compute display name and image with fallback to Clerk user
  const displayName =
    teacher?.fullName ||
    teacher?.name ||
    user?.fullName ||
    (user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '') ||
    'Teacher Name';

  const displayImage =
    (teacher?.imageUrl && teacher.imageUrl !== '')
      ? teacher.imageUrl
      : (user?.imageUrl || '/avatar-placeholder.png');

  // When teacher prop changes, update avatarUrl
  useEffect(() => {
    setAvatarUrl(displayImage);
  }, [displayImage]);

  // When entering edit mode, copy current values
  const startEditing = () => {
    setEditSubject(teacher?.subject || 'Mathematics');
    setEditExperience(teacher?.experience || 1);
    setEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await axios.patch('http://localhost:5000/api/users/profile', { subject: editSubject, experience: editExperience }, {
        headers: { Authorization: `Bearer ${await user.getToken()}` }
      });
      setSuccess('Profile updated!');
      setEditing(false);
      if (onProfileUpdate) onProfileUpdate();
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setSaving(false);
      setTimeout(() => setSuccess(''), 2000);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    setSuccess('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post('http://localhost:5000/api/users/profile/image', formData, {
        headers: {
          Authorization: `Bearer ${await user.getToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setAvatarUrl(res.data.imageUrl);
      setSuccess('Image updated!');
      if (onProfileUpdate) onProfileUpdate();
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
      setTimeout(() => setSuccess(''), 2000);
    }
  };

  return (
    <div className="max-w-xs bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
      <div className="relative">
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow -mt-12 mb-2"
        />
        {isOwnProfile && (
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer hover:bg-blue-700 transition-colors" title="Change photo">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={uploading}
            />
            <span className="material-icons text-sm">photo_camera</span>
          </label>
        )}
      </div>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-lg font-bold">{displayName}</h2>
        {/* Subject */}
        {isOwnProfile && editing ? (
          <select
            className="w-full p-2 border rounded mb-1 text-gray-700"
            value={editSubject}
            onChange={e => setEditSubject(e.target.value)}
          >
            {SUBJECTS.map(subj => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
        ) : (
          <div className="text-gray-500 text-sm mb-1">{teacher?.subject || 'Subject'}</div>
        )}
        <div className="flex items-center text-yellow-500 text-sm mb-1">
          <span className="mr-1">★</span>
          <span className="font-semibold">{teacher?.rating || 4.9}</span>
          <span className="text-gray-400 ml-1">({teacher?.reviews || 124} reviews)</span>
        </div>
        {/* Experience */}
        {isOwnProfile && editing ? (
          <input
            type="number"
            min={1}
            max={50}
            className="w-full p-2 border rounded mb-2 text-gray-700"
            value={editExperience}
            onChange={e => setEditExperience(Number(e.target.value))}
          />
        ) : (
          <div className="text-gray-500 text-sm mb-2">{teacher?.experience || 1} years experience</div>
        )}
        <div className="flex items-center mb-4">
          <span className={`h-3 w-3 rounded-full mr-2 ${teacher?.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          <span className="text-xs text-gray-500">{teacher?.online ? 'Online' : 'Offline'}</span>
        </div>
        <div className="flex w-full gap-2 mb-2">
          <button className="flex-1 border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center text-gray-700 hover:bg-gray-100">
            <span className="material-icons mr-1">mail</span> Message
          </button>
          <button className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center justify-center hover:bg-blue-700">
            <span className="material-icons mr-1">event</span> Schedule
          </button>
        </div>
        {teacher?.freeTime && teacher.freeTime.length > 0 && (
          <div className="w-full mt-2">
            <div className="text-xs font-semibold text-gray-500 mb-1">Available Free Time:</div>
            <ul className="list-disc list-inside text-xs text-gray-700">
              {teacher.freeTime.map((slot, idx) => (
                <li key={idx}>{slot}</li>
              ))}
            </ul>
          </div>
        )}
        {isOwnProfile && (
          <div className="w-full flex flex-col items-center mt-2">
            {error && <div className="text-xs text-red-600 mb-1">{error}</div>}
            {success && <div className="text-xs text-green-600 mb-1">{success}</div>}
            {editing ? (
              <button
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors mt-1"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            ) : (
              <button
                className="w-full bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition-colors mt-1"
                onClick={startEditing}
              >
                Edit Subject & Experience
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfileCard; 