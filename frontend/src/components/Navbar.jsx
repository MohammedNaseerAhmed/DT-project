import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
    <div className="font-bold text-xl text-blue-600">EduSphere</div>
    <ul className="flex gap-4">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/profile">Profile</Link></li>
    </ul>
  </nav>
);

export default Navbar;