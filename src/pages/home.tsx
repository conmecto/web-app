import React from 'react';
import { useAuth } from '../utils/authContext';
import BaseHome from './baseHome';
import CreatorHome from './creatorHome';
import BrandHome from './brandHome';
import Login from './login';

const Home: React.FC = () => {
  const { isAuthenticated, user, accessToken } = useAuth();
  // if (!isAuthenticated || user.type === "creator") {
  //   return (<Login creator={false} />);
  // }
  return (<BrandHome />);
}

export default Home;