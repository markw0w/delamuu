import React, { useState } from "react";
import '../styles/carousel.css'

const CarouselComponent = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={handlePrev} className="prev-button">
        &#8592;
      </button>
      <div className="carousel-wrapper">
        <div
          className="carousel-images"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Productos de Delamuu: Helados, yogures, azaí y candy. Las imagenes son de referencia"
              className="carousel-image"
            />
          ))}
        </div>
      </div>
      <button onClick={handleNext} className="next-button">
        &#8594;
      </button>
    </div>
  );
};

export default CarouselComponent;
