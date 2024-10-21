import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="flex h-60 w-full flex-col bg-black">
      <div className="flex flex-1 flex-row justify-evenly items-end">
        <Link to="/about" className="text-white">About</Link>
        <Link to="/privacy" className="text-white">Privacy Policy</Link>
        <Link to="/terms" className="text-white">Terms of Service</Link>
      </div>
      <div className="flex flex-1 flex-col justify-center items-center">
        <h3 className="text-white">
          &copy; {new Date().getFullYear()} Conmecto. All rights reserved.
        </h3>
      </div>      
    </footer>
  );
}

export default Footer;