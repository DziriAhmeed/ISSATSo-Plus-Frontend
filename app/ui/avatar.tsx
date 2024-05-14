import Image from "next/image"
import React from "react"

export default function Avatar() {
  return (
    <>
      {/*<!-- Component: Rounded full lg sized basic image avatar --> */}
      <a
        href="#"
        className="relative inline-flex items-center justify-center w-12 h-12 text-white rounded-full"
      >
        <Image
          src="/images/profilePic.png"
          alt="user name"
          title="user name"
          width="48"
          height="48"
          className="max-w-full rounded-full"
        />
      </a>
      {/*<!-- End Rounded lg sized basic image avatar --> */}
    </>
  )
}
