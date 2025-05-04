import React, { useEffect, useState, useCallback } from 'react';
import { getAllTeachers } from '../api/teachers';
import TeacherProfileCard from '../components/TeacherProfileCard';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = useCallback(() => {
    getAllTeachers().then(setTeachers).catch(console.error);
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-8 text-center">Our Teachers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {teachers.map(teacher => (
          <TeacherProfileCard
            key={teacher._id}
            teacher={teacher}
            onProfileUpdate={fetchTeachers}
          />
        ))}
      </div>
    </div>
  );
}
