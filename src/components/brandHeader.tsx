import React from 'react';

const BrandHeader: React.FC = () => {
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
        <nav>
          <a href="/dashboard">
            <button type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Checkout <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-white bg-black rounded-full">
                2
              </span>
            </button>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default BrandHeader;