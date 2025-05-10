import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Home from './pages/Home';
import Books from './pages/Books';
import Videos from './pages/Videos';
import Teachers from './pages/Teachers';
import Courses from './pages/Courses';
import Scholarships from './pages/Scholarships';
import AddBook from './pages/AddBook';
import AddVideo from './pages/AddVideo';
import AddCourse from './pages/AddCourse';
import TeacherSchedule from './pages/TeacherSchedule';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AddScholarship from './pages/AddScholarship';

const App = () => (
  <Router>
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/scholarships/add" element={<AddScholarship />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/add-book" element={<SignedIn><AddBook /></SignedIn>} />
            <Route path="/add-video" element={<SignedIn><AddVideo /></SignedIn>} />
            <Route path="/add-course" element={<SignedIn><AddCourse /></SignedIn>} />
            <Route path="/teacher-schedule" element={<SignedIn><TeacherSchedule /></SignedIn>} />
            <Route
              path="/profile"
              element={
                <>
                  <SignedIn>
                    <Profile />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  </Router>
);

export default App;