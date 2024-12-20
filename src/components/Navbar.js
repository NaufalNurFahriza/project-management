import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <ul className="flex items-center h-16 space-x-8">
          <li>
            <Link 
              to="/" 
              className={`px-3 py-2 rounded transition-colors
                ${location.pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              Projects
            </Link>
          </li>
          {location.pathname.includes('/tasks/') && (
            <li>
              <Link 
                to={location.pathname}
                className="px-3 py-2 rounded bg-blue-700"
              >
                Current Project Tasks
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;