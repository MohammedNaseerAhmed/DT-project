import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const sections = [
    {
      title: 'Books',
      description: 'Explore our collection of educational books and resources',
      icon: '📚',
      link: '/books',
      color: 'bg-blue-500'
    },
    {
      title: 'Videos',
      description: 'Watch educational videos and tutorials',
      icon: '🎥',
      link: '/videos',
      color: 'bg-red-500'
    },
    {
      title: 'Courses',
      description: 'Enroll in structured learning courses',
      icon: '📝',
      link: '/courses',
      color: 'bg-green-500'
    },
    {
      title: 'Teachers',
      description: 'Connect with expert teachers and tutors',
      icon: '👨‍🏫',
      link: '/teachers',
      color: 'bg-purple-500'
    },
    {
      title: 'Scholarships',
      description: 'Find and apply for scholarship opportunities',
      icon: '🎓',
      link: '/scholarships',
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Empowering Students with Smarter Learning Solutions
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Access free educational resources, connect with expert teachers, and stay updated with scholarship opportunities.
          </p>
          <div className="max-w-xl mx-auto">
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for books, videos, courses..."
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.title}
              to={section.link}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className={`${section.color} p-6`}>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{section.icon}</span>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{section.description}</p>
                  <div className="mt-4 flex items-center text-blue-600 hover:text-blue-800">
                    <span>Explore {section.title}</span>
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
            <p className="text-gray-600">Tailored educational content to match your learning style</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
            <p className="text-gray-600">Connect with experienced teachers and mentors</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Free Resources</h3>
            <p className="text-gray-600">Access high-quality educational materials at no cost</p>
          </div>
        </div>
      </div>
    </div>
  );
}