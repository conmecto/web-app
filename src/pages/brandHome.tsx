import React, { useState, useEffect } from 'react';
import BrandHeader from '../components/brandHeader';
import SearchHeader from '../components/searchHeader';
import ProductModal from '../components/productModal';
import ProductsVideosCommon from './productVideosCommon'; 
import Footer from '../components/footer';

const BrandHome: React.FC = () => {
  const [searchedValue, setSearchedValue] = useState('');
  const [modalProduct, setModalProduct] = useState<any>(null);

  const handleSubmitSearch = (value: string) => {
    setSearchedValue(value);
  }

  const handleProductModal = (product: any) => {
    setModalProduct(product);
  }

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
      <SearchHeader onSubmitSearch={handleSubmitSearch} />
      <ProductsVideosCommon brandName={searchedValue} handleProductModal={handleProductModal} />
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