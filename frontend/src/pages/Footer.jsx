import React from "react";


function Footer() {
  

  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12  shadow sticky z-50">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
       
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">OnlineJudge</span>. All rights reserved.
        </p>

       
        <div className="flex gap-6 text-sm mt-4 md:mt-0">
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
          <a href="/privacy" className="hover:text-white transition">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
