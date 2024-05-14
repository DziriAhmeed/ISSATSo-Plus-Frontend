import Image from "next/image";
import React from "react";

export default function StudentProfileCard() {
  return (
    <>
      {/* <!-- Component: Empty card --> */}
      <div className="w-72 h-72 bg-white rounded shadow-md text-slate-500 shadow-slate-200">
        <Image
          src="/images/studentprofile.png"
          width={500}
          height={500}
          alt="Empty"
        />
      </div>
      {/* <!-- End Empty card --> */}
    </>
  );
}