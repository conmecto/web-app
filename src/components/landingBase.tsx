import React from 'react';
import Carousel from './carousel';
import { sampleVideo1, sampleVideo2, sampleVideo3 } from '../assets/videos';

const LandingBase: React.FC = () => {
  const videos = [{ source: sampleVideo1 }, { source: sampleVideo2 }, { source: sampleVideo3 }]
  return (
    <div className="flex flex-col h-screen w-screen bg-black">
      <div className="flex flex-1 flex-col justify-center items-center">
        <p className="text-5xl font-bold text-white">
          Your Gateway to Creative AI Videos
        </p>
        <br></br>
        <p className="text-xl font-bold text-white text-center">
          Watch captivating AI movies, series, documentaries and much more!
        </p>
        <br></br>
        <p className="text-xl font-bold text-white text-center">
          Share your own creative videos made with AI
        </p>
      </div>
      <div className="flex flex-3 flex-row">
        <div className="flex flex-2">
        
        </div>
        <div className="flex flex-3">
          <Carousel videos={videos} />
        </div>
      </div>
    </div>
  );
};

export default LandingBase;
