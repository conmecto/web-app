import React from 'react';
import VideoPlayer from './video';
import { sampleVideo1, sampleVideo2, sampleVideo3 } from '../assets/videos';

const LandingBody: React.FC = () => {
  const videos = [{ source: sampleVideo1 }, { source: sampleVideo2 }, { source: sampleVideo3 }, { source: sampleVideo1 }, { source: sampleVideo2 }, { source: sampleVideo3 }]
  return (
    <div className="flex flex-col h-150 w-screen bg-black">
      <div className="flex flex-1 flex-row">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-4/5 h-4/5">
            <VideoPlayer video={videos[0]} />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-4/5 h-4/5">
            <VideoPlayer video={videos[1]} />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-row">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-4/5 h-4/5">
            <VideoPlayer video={videos[2]} />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-4/5 h-4/5">
            <VideoPlayer video={videos[3]} />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-row">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-4/5 h-4/5">
            <VideoPlayer video={videos[4]} />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-4/5 h-4/5">
            <VideoPlayer video={videos[5]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingBody;