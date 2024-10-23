import { useState, useRef } from "react";

const ProductCard = ({ index, product, vertical, handleProductModal }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<any>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  const handleClick = () => {
    console.log('isHovered', isHovered)
    handleProductModal(product);
  };

  return (
    <div key={index} className={`flex w-1/3 p-2 justify-center ${vertical ? "h-70vh" : "h-40vh"}`}>
      <div
        className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer ${vertical ? "w-90per h-full" : "w-full h-4/5"}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={product.thumbnail}
          alt="Thumbnail"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />

        <video
          ref={videoRef}
          src={product.source}
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300"
          muted
          loop
          playsInline
        />

        <div
          className={`absolute flex flex-row bottom-0 left-0 w-full py-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        > 
          <div className="flex flex-2 flex-col justify-evenly pl-2">
            <p className="text-white font-bold text-xl">
              {product.brandName}
            </p>
            <p className="text-white font-medium text-base">
              {product.productName}
            </p>
            <p className="text-white font-medium text-base">
              By {product.creatorName}
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