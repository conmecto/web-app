import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="Footer">
      <div>
        <Link to="/about">About</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
      </div>
      <div>
        &copy; {new Date().getFullYear()} Conmecto. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;