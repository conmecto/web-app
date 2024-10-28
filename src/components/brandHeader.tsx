import React from 'react';
import { useNavigate } from 'react-router-dom';

const BrandHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleSaved = () => {
    navigate('/brand/saved');
  }

  const handleCheckout = () => {
    navigate('/brand/checkout');
  }

  return (
    <header className="flex flex-row h-15vh w-screen bg-logo-color">
      <div className="flex flex-1 items-center pl-1">
        <p className="text-2xl font-bold text-white">
          Conmecto
        </p>
      </div>
      <div className="flex flex-1 flex-row items-center justify-end">
        <nav>
          <a href="/dashboard">
            <button type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Dashboard
            </button>
          </a>
        </nav>
        <button type="button" onClick={handleSaved} className="inline-flex py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
          </svg> 
          Saved
        </button>
        <button type="button" onClick={handleCheckout} className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Checkout <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-white bg-black rounded-full">
            2
          </span>
        </button>
      </div>
    </header>
  );
};

export default BrandHeader;