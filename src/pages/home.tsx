import React from 'react';
import { useAuth } from '../utils/authContext';
import BrandHome from './brandHome';
import CommonHome from './commonHome';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated || user.type !== "brand") {
    return (<CommonHome />);
  }
  return (<BrandHome />);
}

export default Home;