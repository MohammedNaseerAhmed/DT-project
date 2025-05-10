import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

export default function Sidebar() {
  return (
    <aside className="w-50 h-screen bg-white border-r flex flex-col px-6 py-6">
      <nav className="flex flex-col gap-2">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/teachers">Teachers</Link>
        <Link to="/scholarships">Scholarships</Link>
        <SignedIn>
          <Link to="/add-book">Add Book</Link>
          <Link to="/add-video">Add Video</Link>
          <Link to="/add-course">Add Course</Link>
          <Link to="/teacher-schedule">Teacher Schedule</Link>
          <Link to="/profile">Profile</Link>
          <UserButton/>
        </SignedIn>
        <SignedOut>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </SignedOut>
      </nav>
    </aside>
  );
}
