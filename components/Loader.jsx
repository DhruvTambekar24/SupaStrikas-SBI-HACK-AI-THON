import React from 'react';
import loader from './assets/loader.gif'
import Image from 'next/image';
import { TextShimmerWave } from './ui/text-shimmer-wave';
const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#B5179E]/50 to-[#240046]/60 backdrop-blur-lg flex items-center justify-center z-[9999]">
<div className="relative flex items-center justify-center">
  {/* Spinning Border */}
  <div className="w-24 h-24 flex items-center justify-center border-2 border-transparent rounded-full animate-spin border-t-transparent">
    {/* Pulsing Effect */}
    <div className="w-20 h-20 border-4 border-purple-500 rounded-full animate-ping absolute inset-0 opacity-30"></div>
  </div>

  {/* Static Image */}
  <div className="absolute flex items-center justify-center">
    <Image
      src={loader}
      alt="Loader"
      width={80}  
      height={80}
      className="drop-shadow-2xl"
    />
  </div>
</div>


      <span className="absolute mt-36 italic text-xl font-bold tracking-wider text-purple-400 animate-pulse">
      <TextShimmerWave
      className='[--base-color:#ecd2f4] [--base-gradient-color:#e89fff]'
      duration={1}
      spread={1}
      zDistance={1}
      scaleDistance={1.1}
      rotateYDistance={20}
    >
      Smart Solutions for Better Health...
    </TextShimmerWave>
      </span>
    </div>
  );
};

export default Loader;