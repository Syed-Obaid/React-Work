import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  
  const slides = [
    {
      id: 1,
      image: "https://sindhpolice.gov.pk/storage/sliders/0wqAKKEpPKf2wk44CcxaHU6LH8q9l7J7SQfxBjMI.jpg"
    },
    {
      id: 2,
      image: "https://sindhpolice.gov.pk/storage/sliders/StwgJ9UuGfBHweAYp4qDETVfel4vwBIJ1CyPDuMr.jpg"
    },
    {
      id: 3,
      image: "https://sindhpolice.gov.pk/storage/sliders/T3JGI688AkjLIpnaPRFivj0XPFp1eeUv2FnqWHBn.jpg"
    },
    {
      id: 4,
      image: "https://sindhpolice.gov.pk/storage/sliders/WJUa4Zjnh7yQVH0tqTorw2mWZuroH82SBgFIAdLY.jpg"
    },
    {
      id: 5,
      image: "https://sindhpolice.gov.pk/storage/sliders/ajP3LenL1l32FbjFgog6CeBV2GyqhCn53V3vWx8U.jpg"
    },
    {
      id: 6,
      image: "https://sindhpolice.gov.pk/storage/sliders/cSEdA5O5pagkFCyXJ5BTxdWnLCVTHktJYl5EgxVg.png"
    },
    {
      id: 7,
      image: "https://sindhpolice.gov.pk/storage/sliders/crZSfPpvEpDKw84chOfdmglTS754ZNVd5MgcuF8X.jpg"
    },
    {
      id: 8,
      image: "https://sindhpolice.gov.pk/storage/sliders/dqzbG0Dn7JGqr8A3XWWFdimG8GeJdB1HRTgJleoi.jpg"
    },
    {
      id: 9,
      image: "https://sindhpolice.gov.pk/storage/sliders/p57k6WIz4hq0CXaWWthg4vmMeWeEqMN94U3aE380.jpg"
    },
    {
      id: 10,
      image: "https://sindhpolice.gov.pk/storage/sliders/rwt8Yng0yY3X97mS3h13LPOoD5isoEnJavMv3oT4.jpg"
    },
    {
      id: 11,
      image: "https://sindhpolice.gov.pk/storage/sliders/zwPjBTYGTmjYqxejVELlcPkaRkqH4HCQu4uiKklP.png"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
  
    <div className="relative w-full bg-black mt-0">
    
      <div className="relative w-full h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0'
            }`}
          >
        
            <div className="w-full h-full flex items-center justify-center bg-black">
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}

        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-3 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-125 shadow-md'
                    : 'bg-white/70 hover:bg-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;