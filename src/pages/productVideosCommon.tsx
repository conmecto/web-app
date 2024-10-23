import { useState } from 'react';
import Loader from '../components/loader';
import { formatText } from '../utils/helpers';
import { ProductsGrid as HorizontalProductsGrid, ProductsGrid as VerticalProductsGrid } from '../components/horizontalProductGrid';

const ProductsVideosCommon = ({ brandName, handleProductModal }: any) => {
  const [vertical, setVertical] = useState(false);
  // const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSelectDevice = (isVertical: boolean) => {
    setLoading(true);
    setTimeout(() => {
      setVertical(isVertical);
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex h-30vh w-4/5">
        <div className="flex flex-1 items-center">
          <p className="text-3xl font-light">
            {formatText(brandName) || "Creative AI Ads"}
          </p>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <button type="button" onClick={() => handleSelectDevice(false)} className={`py-2.5 px-5 me-2 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${vertical ? "" : "bg-indigo-300"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
            </svg>
          </button>
          <button type="button" onClick={() => handleSelectDevice(true)} className={`py-2.5 px-5 me-2 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${vertical ? "bg-indigo-300" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </button>
          {
            brandName && 
            <button type="button" className="inline-flex py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Categories
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          }
        </div>
      </div>
      {
        loading &&
        (
          <div className="flex h-50vh w-4/5 justify-center items-center">
            <Loader />
          </div>
        )
      }
      {
        !loading && vertical &&
        (
          <VerticalProductsGrid vertical={vertical} handleProductModal={handleProductModal} />
        )
      }
      {
        !loading && !vertical &&
        (
          <HorizontalProductsGrid vertical={vertical} handleProductModal={handleProductModal} />
        )
      }
    </div>
  );
}

export default ProductsVideosCommon;