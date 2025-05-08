import Image from "next/image";
import React from "react";

function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Image
        src="/assets/404Error.svg"
        alt="404 Not Found"
        width={700}
        height={700}
        className="object-cover"
      />
    </div>
  );
}

export default NotFound;
