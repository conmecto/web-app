import { useState, useEffect, useCallback } from 'react';
import getProducts from '../services/getProducts';
import Loader from '../components/loader';
import ProductCard from '../components/productCard';

const perPage = 10;

const ProductsGrid = ({ brandName, category, vertical, handleProductModal }: any) => {
  const [ads, setAds] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const callGetProducts = async () => {
      try {
        const data = await getProducts(page, perPage, (vertical ? 'vertical' : 'horizontal'), signal, brandName, category);
        setAds((prevData) => [...prevData, ...data.ads]);
        setHasMore(data.hasMore);
      } catch(error) {
      } finally {
        setLoading(false);
      }
    }
    if (hasMore) {
      callGetProducts();
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

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-wrap -mx-2 w-4/5">
        {
          ads.map((ad: any, index: number) => (
            <ProductCard key={index} product={ad} vertical={vertical} handleProductModal={handleProductModal} />
          ))
        }
      </div>
    </div>
  );
}

export {
  ProductsGrid
}