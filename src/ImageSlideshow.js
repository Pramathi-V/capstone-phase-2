import React, { useState } from "react";

const ImageSlideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to the next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Navigate to the previous image
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <button
        onClick={goToPrevious}
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "transparent",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        &#10094;
      </button>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={{
          maxWidth: "80%",
          maxHeight: "500px",
          objectFit: "contain",
          margin: "20px auto",
        }}
      />
      <button
        onClick={goToNext}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "transparent",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlideshow;
