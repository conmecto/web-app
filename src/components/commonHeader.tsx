import React from 'react';
import { useNavigate } from 'react-router-dom';
import { conmectoLogo } from '../assets/images';

const CommonHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  }

  const handleAICreators = () => {
    navigate('/creator/join');
  }

  const handleLogin = () => {
    navigate('/login');
  }

  const handleJoinNow = () => {
    navigate('/join');
  }

  return (
    <header className="flex flex-row h-15vh w-screen bg-logo-color">
      <div className="flex flex-1 items-center pl-1">
        <img className="h-full" src={conmectoLogo} />
        <p className="text-2xl font-bold text-white">
          Conmecto
        </p>
      </div>
      <div className="flex flex-1 flex-row items-center justify-end">
        <button type="button" onClick={handleHome} className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
        </button>
        <button type="button" onClick={handleAICreators} className="inline-flex py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          AI Creators
        </button>
        <button type="button" onClick={handleLogin} className="inline-flex py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Login
        </button>
        <button type="button" onClick={handleJoinNow} className="inline-flex py-2.5 px-5 me-2 text-sm font-medium text-white bg-blue-600 focus:outline-none rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Join Now
        </button>
      </div>
    </header>
  );
};

export default CommonHeader;