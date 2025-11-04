import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section className="bg-white text-black py-4 my-4">
        <div className="container mx-auto px-4 text-center">
          <div className={`max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-2xl md:text-4xl font-bold mb-6 animate-bounce">
              Welcome to Traffic Police Karachi
            </h1>
            <p className="text-xl md:text-2xl   leading-relaxed max-w-3xl text-center mx-auto">
             The Sindh Police in pursuit of its mission, believes in providing quality service with the highest possible degree of excellence, based upon the principles
            </p>
           
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;