import React from 'react';

const NoAdFound: React.FC = () => {
  return (
    <div className="flex flex-col h-1/2 w-screen justify-center items-center">
      <p className="text-xl text-logo-color font-medium">
        No AI-generated video is available for this brand at the moment.
      </p>
      <p className="text-xl text-logo-color font-medium">
        Please contact us at <span className="text-xl text-black font-bold">contact@conmect.com</span>
      </p>
      <p className="text-xl text-logo-color font-medium">
        for any custom requirements or inquiries.
      </p>
    </div>
  );
};

export default NoAdFound;