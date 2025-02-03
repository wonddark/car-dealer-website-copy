"use client";

import React, { useEffect, useState } from "react";

type Props = {
  imageUrl: string;
  alt: string;
};

export default function ReliableImage({ imageUrl, alt }: Readonly<Props>) {
  const [imgUrl, setImgUrl] = useState(imageUrl);
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const handleError = () => {
    setImgUrl("/assets/img/core-img/sedan.png");
    setFullyLoaded(true);
  };
  const [imgClass, setImgClass] = useState(
    "mb-2 rounded-2 object-fit-cover ratio ratio-4x3 object-fit-cover d-none",
  );
  useEffect(() => {
    if (fullyLoaded) {
      setImgClass((prevState) => prevState.replace(" d-none", ""));
    }
  }, [fullyLoaded]);

  const placeholderClass =
    "ratio ratio-4x3 w-100 placeholder-glow mb-2" +
    (fullyLoaded ? " d-none" : "");

  useEffect(() => {
    console.log(imgClass, placeholderClass, imgUrl, fullyLoaded);
  }, [fullyLoaded]);

  return (
    <>
      <img
        className={imgClass}
        src={imgUrl}
        alt={alt}
        onLoad={() => {
          console.log("Should update");
          setFullyLoaded(true);
        }}
        onError={handleError}
      />
      <div className={placeholderClass}>
        <div className="h-100 w-100 placeholder rounded-2"></div>
      </div>
    </>
  );
}
