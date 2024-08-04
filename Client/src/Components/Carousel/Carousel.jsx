import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

//children ta ke rename korlam just slides e
const Carousel = ({ children: slides }) => {
  const [Curr, setCurr] = useState(0);
  const prev = () =>
    setCurr((Curr) => (Curr === 0 ? slides.length - 1 : Curr - 1));
  const next = () =>
    setCurr((Curr) => (Curr === slides.length - 1 ? 0 : Curr + 1));

  return (
    <div className="overflow-hidden relative">
      {/* Slides */}
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${Curr * 100}%)` }}
      >
        {slides}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 w-full flex justify-between items-center px-2">
        <button
          onClick={prev}
          className={` p-2 rounded-full text-white ${
            Curr === 0 ? "bg-red-300" : "bg-red-500"
          }`}
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={next}
          className={` p-2 rounded-full text-white ${
            Curr === slides?.length - 1 ? "bg-red-300" : "bg-red-500"
          }`}
        >
          <FaAngleRight />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-1 right-0 left-0">
        <div className="flex justify-center items-center space-x-1">
          {slides?.map((_, i) => (
            <div
              key={i}
              className={`transition-all ease-in-out text-xs w-6 p-1 text-center duration-500 rounded-full bg-white ${
                Curr === i ? "scale-110" : "bg-opacity-50"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
