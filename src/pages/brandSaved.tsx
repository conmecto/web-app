import React, { useState, useEffect } from 'react';
import getBookmarkedAds from '../services/getBookmarkedAds';
import removeBookmark from '../services/removeBookmark';
import Loader from '../components/loader';
import BrandHeader from '../components/brandHeader';
import ProductModal from '../components/productModal';
import ProductCard from '../components/productCard';
import { useAuth } from '../utils/authContext';


const BrandSaved: React.FC = () => {
  const authData = useAuth();
  const { user, isAuthenticated } = authData;
  const [loading, setLoading] = useState(true);
  const [modalProduct, setModalProduct] = useState<any>(null);
  const [removeBookmarkCheck, setRemoveBookmarkCheck] = useState<number>();
  const [horizontalSavedList, setHorizontalSavedList] = useState<any[]>([]);
  const [verticalSavedList, setVerticalSavedList] = useState<any[]>([]);
  
  const handleProductModal = (product: any) => {
    setModalProduct(product);
  }

  const handleRemoveBookmark = (adId: number, orientation: string) => {
    setLoading(true);
    if (orientation === 'horizontal') {
      setHorizontalSavedList(horizontalSavedList.filter(ad => ad.id !== adId));
    } else {
      setVerticalSavedList(verticalSavedList.filter(ad => ad.id !== adId));
    }
    setRemoveBookmarkCheck(adId);
  }

  useEffect(() => {
    if (!removeBookmarkCheck) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    const callRemoveBookmark = async () => {
      try {
        await removeBookmark(user.id as number, removeBookmarkCheck, signal, authData);
      } catch(error) {
      } finally {
        setRemoveBookmarkCheck(undefined);
        setLoading(false);
      }
    }
    callRemoveBookmark();
    return () => {
      controller.abort();
    }
  }, [removeBookmarkCheck]); 

  useEffect(() => {
    if (!isAuthenticated || !user?.id || user?.type !== 'brand') {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    const callGetBookmarksList = async () => {
      try {
        const data = await getBookmarkedAds(user.id as number, signal, authData);
        const ads = data.bookmarked_ads;
        const horizontalAds = ads.filter((ad: any) => ad.orientation === 'horizontal');
        const verticalAds = ads.filter((ad: any) => ad.orientation === 'vertical');
        setHorizontalSavedList(horizontalAds);
        setVerticalSavedList(verticalAds);
      } catch(error) {
      } finally {
        setLoading(false);
      }
    }
    callGetBookmarksList();
    return () => {
      controller.abort();
    }
  }, []); 
  
  useEffect(() => {
    if (modalProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [(!!modalProduct)]);

  if (loading) {
    return (
      <div className="flex flex-col">
        <BrandHeader />
        <div className="flex pt-10 pl-10 items-center">
          <p className="text-2xl font-semibold">
            Saved AI Videos: <span className="text-2xl font-normal">{horizontalSavedList.length + verticalSavedList.length} Items</span>
          </p>
        </div>
        <div className="flex p-10 justify-center items-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <BrandHeader />
      <div className="flex pt-10 pl-10 items-center">
        <p className="text-2xl font-semibold">
          Saved AI Videos: <span className="text-2xl font-normal">{horizontalSavedList.length + verticalSavedList.length} Items</span>
        </p>
      </div>
      <div className="flex p-10 items-center">
        <p className="py-2.5 px-5 me-2 focus:outline-none rounded-lg border border-gray-200 bg-gray-100 text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
          </svg>
        </p>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-1 flex-wrap -mx-2 w-4/5">
          {
            horizontalSavedList.map((ad: any, index: number) => (
              <ProductCard key={index} product={ad} handleProductModal={handleProductModal} isSaved={true} handleRemoveBookmark={handleRemoveBookmark} />
            ))
          }
        </div>
      </div>
      <div className="flex p-10 items-center">
        <p className="py-2.5 px-5 me-2 focus:outline-none rounded-lg border border-gray-200 bg-gray-100 text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
        </p>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-1 flex-wrap -mx-2 w-4/5">
          {
            verticalSavedList.map((ad: any, index: number) => (
              <ProductCard key={index} product={ad} handleProductModal={handleProductModal} isSaved={true} handleRemoveBookmark={handleRemoveBookmark} />
            ))
          }
        </div>
      </div>
      {
        modalProduct && 
        (
          <ProductModal product={modalProduct} handleProductModal={handleProductModal} 
            bookmarks={new Set([modalProduct.id])} 
            />
        )
      }
    </div>
  );
}

export default BrandSaved;