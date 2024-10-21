import React, { useState } from 'react';
import BrandHeader from '../components/brandHeader';
import SearchHeader from '../components/searchHeader';
import ProductsVideosCommon from './productVideosCommon'; 
import Footer from '../components/footer';

const BrandHome: React.FC = () => {
  const [searchedValue, setSearchedValue] = useState('');

  const handleSubmitSearch = (value: string) => {
    setSearchedValue(value);
  }

  return (
    <div className="flex flex-col">
      <BrandHeader />
      <SearchHeader onSubmitSearch={handleSubmitSearch} />
      <ProductsVideosCommon brandName={searchedValue} />
      <Footer />
    </div>
  );
}

export default BrandHome;