import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BrandProtectedRoute from '../utils/brandProtectedRoute';
import Home from './home';
import Signup from './signup';
import Login from './login';
import BrandSaved from './brandSaved';
import BrandCheckout from './brandCheckout';
import BrandOrders from './brandOrders';

const AppRoutes: React.FC = () => {  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/join" element={<Signup />} />
      <Route path="/login" element={<Login creator={false} />} />
      <Route path="/creator/join" element={<Signup />} />
      <Route path="/ai-videos/:orientation" element={<Home />} />
      <Route path="/ai-videos/:orientation/:brandName" element={<Home />} />
      <Route path="/ai-videos/:orientation/:brandName/:category" element={<Home />} />
      <Route path="/ai-videos/:orientation/:brandName/:category/:productName" element={<Home />} />
      <Route element={<BrandProtectedRoute />}>
        <Route path="/brand/orders" element={<BrandOrders />} />
        <Route path="/brand/saved" element={<BrandSaved />} />
        <Route path="/brand/checkout" element={<BrandCheckout />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes;