import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

export default function TopNav() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <div className="flex items-center gap-4">
        <span className="font-bold text-2xl text-blue-600">EduSphere</span>
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/teachers">Teachers</Link>
        <Link to="/scholarships">Scholarships</Link>
      </div>
      <div className="flex items-center gap-2">
        <input className="border rounded px-3 py-1" placeholder="Search resources..." />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link to="/login" className="px-3 py-1 border rounded">Log in</Link>
          <Link to="/signup" className="px-3 py-1 bg-blue-600 text-white rounded">Sign up</Link>
        </SignedOut>
      </div>
    </header>
  );
}
