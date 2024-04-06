import React from "react";

const FallbackLoader = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen text-xs sm:text-sm md:text-xl font-bold animate-pulse transform ease-in-out">
      <h1>Loading...</h1>
    </div>
  );
};

export default FallbackLoader;
