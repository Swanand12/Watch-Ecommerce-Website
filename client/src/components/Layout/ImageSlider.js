import React, { useState } from "react";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaCircle,
} from "react-icons/fa";

const ImageSlider = () => {
  // eslint-disable-next-line
  const [images, setImages] = useState(["1", "2", "3", "4", "5"]);

  const [currentImage, setCurrentImage] = useState(0);

  const handleLeftButton = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : currentImage - 1
    );
  };
  const handleRightButton = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : currentImage + 1
    );
  };

  return (
    <>
      <div className="ImageSlider relative w-[100%] overflow-hidden scrollbar-hide">
        <div
          className="flex h-[30rem] w-[100%] transition-transform  duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={require(`../../../public/assets/img${img}.jpg`)}
              alt={img}
              className="bg-red-500 border-2 my-10 rounded-lg mx-[5%] border-black w-[100%] md:w-[90%] flex-shrink-0"
            />
          ))}
        </div>

        <button
          onClick={handleLeftButton}
          className="absolute left-24 top-1/2 -translate-y-1/2"
          type="button"
        >
          <FaChevronCircleLeft className="text-5xl text-white " />
        </button>
        <button
          onClick={handleRightButton}
          className="absolute right-24 top-1/2 transform -translate-y-1/2"
          type="button"
        >
          <FaChevronCircleRight className="text-5xl text-white" />
        </button>
        <div className=" absolute w-full flex justify-center top-[90%] -translate-y-8">
          <div className="flex justify-between w-[8rem] ">
            {images.map((_, i) => {
              return (
                <button
                  onClick={() => setCurrentImage(i)}
                  className=" "
                  type="button"
                >
                  <FaCircle
                    className={` ${
                      currentImage === i
                        ? "text-gray-400 text-sm scale-150 transform duration-300 bg-black rounded-full "
                        : "text-white text-sm transform duration-300  bg-black rounded-full "
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
