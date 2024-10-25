import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getBrandProductsList from '../services/getBrandProductsList';
import ProductsVideosCommon from './productVideosCommon'; 
import BrandHeader from '../components/brandHeader';
import SearchHeader from '../components/searchHeader';
import ProductModal from '../components/productModal';

const BrandHome: React.FC = () => {
  const { orientation, brandName, category, productName } = useParams();
  const navigate = useNavigate();
  const [modalProduct, setModalProduct] = useState<any>(null);
  const [brandProductsList, setBrandProductsList] = useState<any[]>([]);
  const resetChildKey = `${orientation}-${brandName}-${category}-${productName}`;

  const handleClearSearch = () => {
    let url = '/ai-videos';
    if (orientation) {
      url += (`/${orientation}`);
    } else {
      url += ('/horizontal');
    }
    setBrandProductsList([]);
    navigate(url);
  }

  const handleSelectDevice = (device: string) => {
    let url = '/ai-videos/' + device;
    if (brandName) {
      url += (`/${brandName}`)
    }
    if (category) {
      url += (`/${category}`)
    }
    if (productName) {
      url += (`/${productName}`)
    }
    navigate(url);
  }

  const handleProductModal = (product: any) => {
    setModalProduct(product);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const callGetBrandProducts = async () => {
      try {
        const data = await getBrandProductsList(brandName as string, signal);
        setBrandProductsList(data.products);
      } catch(error) {
      }
    }
    if (brandName) {
      callGetBrandProducts();
    }
    return () => {
      controller.abort();
    }
  }, [brandName]); 
  
  useEffect(() => {
    if (modalProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [(!!modalProduct)]);

  return (
    <div className="flex flex-col">
      <BrandHeader />
      <SearchHeader />
      <ProductsVideosCommon 
        key={resetChildKey} brandProductsList={brandProductsList} handleProductModal={handleProductModal} 
        handleSelectDevice={handleSelectDevice} handleClearSearch={handleClearSearch}
      />
      {
        modalProduct && 
        (
          <ProductModal product={modalProduct} handleProductModal={handleProductModal} />
        )
      }
    </div>
  );
}

export default BrandHome;