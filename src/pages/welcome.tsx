import React from 'react';
import { conmectoLogo } from '../assets/images';

const Welcome: React.FC = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-black">
      <div className="flex h-[20vw] w-[20vw] justify-center items-center">
        <img src={conmectoLogo} className="h-full w-full rounded-full" />
      </div>
    </div>
  );
}

export default Welcome;