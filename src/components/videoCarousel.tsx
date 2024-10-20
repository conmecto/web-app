import React, { useState }  from 'react';
import { ArrowLeftCircle } from 'lucide-react';
import CustomVideoPlayer from './video';

const VideoCarousel = ({ videos }: any) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  return (
    <div className="relative flex w-full max-w-4xl mx-auto justify-center items-center">
      <div className="flex w-full h-4/5">
        <CustomVideoPlayer video={videos[currentVideoIndex]}/>
      </div>

      {/* <button type="button" className="text-white bg-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        <span className="sr-only">Icon description</span>
      </button>
       */}
      <button
        className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 focus:outline-none"
        onClick={handlePrev}
      >
        &#8592;
      </button>

      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 focus:outline-none"
        onClick={handleNext}
      >
        &#8594;
      </button>
    </div>
  );
};

export default VideoCarousel;