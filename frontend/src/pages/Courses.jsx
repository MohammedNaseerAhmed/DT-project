import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import { getAllCourses } from '../api/courses';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getAllCourses().then(setCourses).catch(console.error);
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map(course => <CourseCard key={course._id} course={course} />)}
      </div>
    </div>
  );
}
