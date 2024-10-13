import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-row h-20 w-screen">
      <div className="flex flex-2 justify-center items-center">
        <p className="text-3xl font-bold text-white">
          Conmecto
        </p>
      </div>
      <div className="flex flex-1 justify-end items-center">
        <nav>
          <a href="/creators">
            <button type="button" className="text-white bg-gradient-to-r from-logo-color to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              AI Creators
            </button>
          </a>
        </nav>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <nav>
          <a href="/signup">
            <button type="button" className="text-white bg-gradient-to-r from-logo-color to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Join Now
            </button>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
