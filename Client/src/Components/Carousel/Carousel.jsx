import React, { useState } from "react";

const Carousel = ({ children: slides }) => {
  const [Curr, setCurr] = useState(0);
  const prev = () =>
    setCurr((Curr) => (Curr === 0 ? slides.length - 1 : Curr - 1));
  const next = () =>
    setCurr((Curr) => (Curr === slides.length - 1 ? 0 : Curr + 1));
  //children ta ke rename korlam just slides e
  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${Curr * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute inset-0 w-full flex justify-between items-center">
        <button onClick={prev} className="bg-red-500 p-2 rounded-full w-10">
          -
        </button>
        <button onClick={next} className="bg-red-500 p-2 rounded-full w-10">
          +
        </button>
      </div>
    </div>
  );
};

export default Carousel;
