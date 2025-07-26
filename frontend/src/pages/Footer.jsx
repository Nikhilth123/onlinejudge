import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100 border-t ">
      <div className="max-w-screen-xl mx-auto px-4 py-8 md:flex md:justify-between md:items-center">
        <div className="flex items-center space-x-3">
         
          <span className="text-lg font-semibold text-gray-800">Online Judge</span>
        </div>

        <div className="flex flex-wrap gap-6 mt-6 md:mt-0 text-sm text-gray-600">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <a href={import.meta.env.VITE_GITHUB} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-4 pb-4">
        © {new Date().getFullYear()} Online Judge. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
