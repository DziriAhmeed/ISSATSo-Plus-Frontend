import Image from "next/image";
import React from "react";
export default function StudentStack() {
    return (
        <div className="flex flex-wrap justify-center">
      {/* Card 1 */}
      <div className="w-40 h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 bg-white border border-gray-300 shadow-lg m-4 rounded-lg transition duration-300 ease-in-out transform hover:border-blue-500 hover:shadow-blue-500">
      <Image src="/images/quizz.png" layout="fill" objectFit="cover" alt="" className="rounded-lg" />
      </div>

      {/* Card 2 */}
      <div className="w-40 h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 bg-[#ffffff] border border-gray-300 shadow-lg m-4 rounded-lg transition duration-300 ease-in-out transform hover:border-blue-500 hover:shadow-blue-500">
        <Image src="/images/presence.png"
        width={400}
        height={260}
        alt=""
    className="rounded-lg" />
      </div>

      {/* Card 3 */}
      <div className="w-40 h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 bg-white border border-gray-300 shadow-lg m-4 rounded-lg transition duration-300 ease-in-out transform hover:border-blue-500 hover:shadow-blue-500">
        <Image src="/images/eventnumber.png" layout="fill" objectFit="cover" alt="" className="rounded-lg" />
      </div>
    </div>
  );
    
}
