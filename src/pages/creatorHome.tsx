import React from 'react';
import Header from '../components/header';
import LandingBase from '../components/landingBase';
import LandingBody from '../components/landingBody';
import Faqs from '../components/faqs';
import Footer from '../components/footer';

const CreatorHome: React.FC = () => {
  return (
    <div className="flex flex-col bg-black">
      <Header />
      <LandingBase />
      <LandingBody />
      <Faqs />
      <Footer />
    </div>
  );
}

export default CreatorHome;