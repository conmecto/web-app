import React, { useState } from 'react';
import Loader from '../components/loader';
import imageThumbnail from '../assets/images/thumbnail.png';
import testVideo from '../assets/videos/sampleVideo1.mp4';
import { formatText } from '../utils/helpers';

const data = [
  {
    source: testVideo,
    thumbnail: imageThumbnail,
    isVertical: false,
    verticalAvailable: false,
    brandName: 'Nike',
    productName: 'Sabrina 2 EP Basketball Shoes',
    description: "Sabrina Ionescu's success is no secret. Her game is based on living in the gym, getting in rep after rep to perfect her craft. The Sabrina 2 sets you up to do more, so you're ready to go when it's game time. Our newest Cushlon foam helps keep you fresh, Air Zoom cushioning adds the pop and sticky traction helps you create that next-level distance. Sabrina's handed you the tools. Time to go to work. With its extra-durable rubber outsole, this version gives you traction for outdoor courts",
    currency: 'indian_rupee',
    price: 2500
  }
]

const ProductCard = ({ productName, description }: any) => (
  <div className="bg-white rounded-lg shadow-md p-4">
    <h2 className="text-xl font-bold mb-2">{productName}</h2>
    <p>{description}</p>
  </div>
);

const ProductsGrid = ({ products }: any) => {
  return (
    <div className="h-50vh grid grid-cols-2 gap-4">
      {products.map((product: any, index: number) => (
        <div key={index}>
          <ProductCard title={product.productName} content={product.description} />
        </div>
      ))}
    </div>
  );
}

const ProductsVideosCommon = ({ brandName }: any) => {
  const [vertical, setVertical] = useState(false);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectDevice = (isVertical: boolean) => {
    console.log('isVertical', isVertical)
    setVertical(isVertical);
  }

  console.log('vertical', vertical)

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
        !loading &&
        (
          <div className="flex w-4/5">
            <ProductsGrid products={data} />
          </div>
        )
      }
    </div>
  );
}

export default ProductsVideosCommon;