import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getProducts from '../services/getProducts';
import getProductsWithAuth from '../services/getProductsWithAuth';
import Loader from '../components/loader';
import ProductCard from '../components/productCard';
import SelectProductDropDown from '../components/productDropDown';
import NoAdFound from '../components/noAdFound';
import { formatText } from '../utils/helpers';
import { useAuth } from '../utils/authContext';

const perPage = 10;

const ProductsVideosCommon = ({ brandProductsList, handleProductModal, handleSelectDevice, handleClearSearch }: any) => {
  const authData = useAuth();
  const { orientation, brandName, category, productName } = useParams();
  const navigate = useNavigate();
  const isVertical = orientation === 'vertical';
  const [ads, setAds] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const callGetProducts = async () => {
      try {
        let data: any = null;
        if (authData?.isAuthenticated && authData?.user?.id && authData?.user?.type === 'brand') {
          data = await getProductsWithAuth(
            authData?.user?.id, page, perPage, (orientation || 'horizontal'), signal, 
            authData, brandName, category, productName
          );
        } else {
          data = await getProducts(page, perPage, (orientation || 'horizontal'), signal, brandName, category, productName);
        }
        setAds((prevData) => [...prevData, ...data.ads]);
        setHasMore(data.hasMore);
      } catch(error) {
      } finally {
        setLoading(false);
      }
    }
    if (hasMore) {
      callGetProducts();
      setLoading(true);
    }
    return () => {
      controller.abort();
    }
  }, [page]);
  
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight ||
      loading ||
      !hasMore
    )
      return;

    setPage((prevPage) => prevPage + 1);
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleClearCategory = () => {
    const url = `/ai-videos/${orientation}/${brandName}`;
    navigate(url);
  }

  const handleClearProduct = () => {
    const url = `/ai-videos/${orientation}/${brandName}/${category}`;
    navigate(url);
  }

  const handleCategoryDropdown = () => {
    if (showDropdown === 'category') {
      setShowDropdown('');
    } else {
      setShowDropdown('category');
    }
  }

  const handleProductDropdown = () => {
    if (showDropdown === 'product') {
      setShowDropdown('');
    } else {
      setShowDropdown('product');
    }
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex h-30vh w-4/5">
        <div className="flex flex-1 items-center">
          <p className="text-3xl font-light pr-2">
            {brandName ? formatText(brandName?.replace('-', ' ')) : "Creative AI Videos for Brands"}      
          </p>
          {
            brandName && (
              <button onClick={handleClearSearch} type="button" className="p-1 rounded-full text-gray-900 focus:outline-none bg-white border border-gray-400 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button> 
            )
          }
        </div>
        <div className="flex items-center justify-end">
          <button type="button" onClick={() => handleSelectDevice('horizontal')} className={`py-2.5 px-5 me-2 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isVertical ? "" : "bg-indigo-300"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
            </svg>
          </button>
          <button type="button" onClick={() => handleSelectDevice('vertical')} className={`py-2.5 px-5 me-2 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isVertical ? "bg-indigo-300" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </button>
        </div>
        {
          brandName && (
            <div className="flex">
              <div className="relative flex flex-col items-center justify-center">
                {
                  category ? (
                    <button type="button" onClick={handleClearCategory} 
                      className={`inline-flex py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 bg-indigo-300`}>
                      {formatText(category?.replace('-', ' '))}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg> 
                    </button>
                  ) : (
                    <button type="button" onClick={handleCategoryDropdown} 
                      className={`inline-flex py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 
                        ${showDropdown === 'category' ? "bg-indigo-300" : "bg-white"}`}
                      >
                      Categories
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                  )
                }
                {
                  (showDropdown === 'category')  &&  (
                    <SelectProductDropDown showDropdown={showDropdown} brandProductsList={brandProductsList} handleDropdown={handleCategoryDropdown} />
                  )
                }
              </div>
              <div className="relative flex flex-col items-center justify-center">
                {
                  productName ? (
                    <button type="button" onClick={handleClearProduct} 
                      className={`inline-flex py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 bg-indigo-300`}>
                      {formatText(productName?.replace('-', ' '))}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg> 
                    </button>
                  ) : (
                    <button type="button" onClick={handleProductDropdown} 
                      className={`inline-flex py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:text-logo-color focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 
                        ${showDropdown === 'product' ? "bg-indigo-300" : "bg-white"}`}
                      >
                      Products
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                  )
                }
                {
                  (showDropdown === 'product')  &&  (
                    <SelectProductDropDown showDropdown={showDropdown} brandProductsList={brandProductsList} handleDropdown={handleProductDropdown} />
                  )
                }
              </div>
            </div>
          )
        }
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-1 flex-wrap -mx-2 w-4/5">
          {
            ads.map((ad: any, index: number) => (
              <ProductCard key={index} product={ad} handleProductModal={handleProductModal} />
            ))
          }
        </div>
        {
          loading && (<Loader />)
        }
      </div>
      {
        brandName && (!ads?.length) && (
          <NoAdFound />
        )
      }
    </div>
  );
}

export default ProductsVideosCommon;