import React from 'react';
import { useAuth } from '../utils/authContext';
import BaseHome from './baseHome';
import CreatorHome from './creatorHome';
import BrandHome from './brandHome';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  // if (!isAuthenticated) {
  //   return (<BaseHome />);
  // }
  // if (user.type === "creator") {
  //   return (<CreatorHome />);
  // }
  return (<BrandHome />);
}

export default Home;