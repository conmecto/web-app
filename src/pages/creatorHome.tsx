import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const CreatorHome: React.FC = () => {
  return (
    <div className="flex flex-col bg-black">
      <Header />
      <Footer />
    </div>
  );
}

export default CreatorHome;