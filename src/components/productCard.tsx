import { useState, useRef } from "react";
import { formatText } from "../utils/helpers";

const ProductCard = ({ index, product, handleProductModal, isSaved, handleRemoveBookmark }: any) => {
  const isVertical = product.orientation === 'vertical';
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<any>(null);

  const handleMouseEnter = async () => {
    const video = videoRef.current;
    if (video) {
      try {
        setIsHovered(true);
        await video.play();
      } catch (error) {
      }
    }
  };

  const handleMouseLeave = async () => {
    const video = videoRef.current;
    if (video) {
      try {
        setIsHovered(false);
        await video.pause();
        video.currentTime = 0;
      } catch (error) {
      }
    }
  };

  const handleClick = () => {
    handleProductModal(product);
  };

  return (
    <div key={index} className={`flex w-1/3 p-2 justify-center ${isVertical ? "h-70vh" : "h-40vh"}`}>
      <div
        className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer ${isVertical ? "w-90per h-full" : "w-full h-4/5"}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      > 

        <img
          src={product.thumbnailKey}
          alt="Thumbnail"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />

        <video
          ref={videoRef}
          src={product.compressedKey}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          playsInline
        />
        {
          isSaved && (
            <div
              className={`absolute flex top-0 right-2 py-2 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}>
              <button type="button" onClick={() => handleRemoveBookmark(product.id, product.orientation)} className="bg-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )
        }
        <div
          className={`absolute flex flex-row bottom-0 left-0 w-full py-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        > 
          <div className="flex flex-2 flex-col justify-evenly pl-2">
            <p className="text-white font-bold text-xl">
              {formatText(product.brandName)}
            </p>
            <p className="text-white font-medium text-base">
              {formatText(product.productName)}
            </p>
            <p className="text-white font-medium text-base">
              By {formatText(product.firstname) + " " + formatText(product.lastname)}
            </p>
          </div>
          <div className="flex flex-1 justify-end items-end pr-1">
            <button type="button" className="text-white bg-gradient-to-r from-logo-color to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-2 py-2 me-2">
              Get License
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;