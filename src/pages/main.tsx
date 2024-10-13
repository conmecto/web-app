import React from 'react';
import Header from '../components/header';
import LandingBase from '../components/landingBase';
import Footer from '../components/footer';

const MainContent: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <LandingBase />
      {/* <Footer /> */}
    </div>
  );
}

export default MainContent;