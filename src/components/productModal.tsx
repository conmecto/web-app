import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import addBookmark from '../services/addBookmark';
import { useAuth } from '../utils/authContext';
import { currencySymbols } from '../utils/constants';
import { formatText } from '../utils/helpers';

const ProductModal = ({ product, handleProductModal, bookmarks, setBookmarks }: any) => {
  const authData = useAuth();
  const { isAuthenticated, user } = authData;
  const navigate = useNavigate();
  const videoRef = useRef<any>(null);
  const isBookMarked = bookmarks?.has(product.id);
  const [saveAd, setSaveAd] = useState(false);

  const handleCloseModal = () => {
    handleProductModal(null);
  }

  useEffect(() => {
    if (!saveAd) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    const callSaveBookmark = async () => {
      try {
        const data = await addBookmark(user.id, product.id,signal, authData);
        const tempSet = new Set(bookmarks);
        tempSet.add(product.id);
        setBookmarks(tempSet);
      } catch(error) {
      }
    }
    callSaveBookmark();
    return () => {
      controller.abort();
    }
  }, [saveAd]);

  const handleSaveAd = () => {
    setSaveAd(true);
  }

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div className="fixed inset-0 h-screen w-screnn z-50 flex justify-center bg-black bg-opacity-70 items-center">
      <div className="flex flex-col bg-white rounded-xl relative h-90per w-80per">
        <div className="flex h-1/6 flex-row">
          <div className="flex flex-2 flex-col justify-evenly pl-4">
            <p className="text-3xl font-bold">
              {formatText(product.brandName)}
            </p>
            <p className="text-xl font-medium">
              {formatText(product.productName)}
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center">
            {
              isAuthenticated ? (
                <div className="flex h-3/5 w-4/5 flex-row items-center justify-evenly bg-gradient-to-r from-logo-color to-blue-600 rounded-xl">
                  <div className="flex-col">
                    <p className="text-2xl font-bold text-white">
                      {currencySymbols[product.currency]} {product.price}
                    </p>
                    <p className="text-sm font-normal text-white">
                      + applicable taxes
                    </p>
                  </div>
                  <button type="button" onClick={handleSaveAd} className="h-2/3 inline-flex justify-between py-2 px-2 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 items-center">
                    Buy Now 
                  </button>
                </div>
              ) : (
                <div role="button" onClick={handleLogin} className="flex h-1/2 p-2 items-center justify-between bg-gradient-to-r from-logo-color to-blue-600 rounded-xl">
                  <p className="text-lg font-semibold text-white pr-1">
                    Login to Check Price
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
              )
            }
          </div>
          <div className="flex px-2">
            <button onClick={handleCloseModal} className="h-1/2 w-full text-black hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex h-2/3 justify-center items-center">
          <video
            ref={videoRef}
            controls
            autoPlay
            className="h-full w-full rounded-md"
          >
            <source src={product.compressedKey} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex h-1/6 flex-row">
          <div className="flex flex-2 flex-col justify-evenly pl-4">
            <p className="text-xl font-bold">
              By {formatText(product.firstname) + " " + formatText(product.lastname)}
            </p>
            <p className="inline-flex text-m">
              # {product.summary}
            </p>
            <p className="text-m">
              Dimensions: {product.width} ✗ {product.height} 
            </p>
          </div>
          <div className="flex flex-1 items-center justify-end pr-4">
            {
              isAuthenticated ? (
                isBookMarked ? (
                  <div className="inline-flex h-1/2 justify-between py-2 px-2 me-2 text-sm font-medium text-logo-color focus:outline-none bg-gray-100 rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                    </svg> 
                    {"Saved for later"}
                  </div>
                ) : (
                  <button type="button" onClick={handleSaveAd} className="inline-flex h-1/2 justify-between py-2 px-2 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                    {"Save for later"}
                  </button>
                )
              ) : (
                <div className="inline-flex h-1/2 justify-between py-2 px-2 me-2 text-sm font-medium text-logo-color focus:outline-none bg-gray-100 rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                  {"Login to save"}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
