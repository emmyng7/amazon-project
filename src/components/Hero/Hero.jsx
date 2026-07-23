import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import heroImages from "./heroImages";

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === heroImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative overflow-hidden">

      {/* Banner */}

      <img
        src={heroImages[current]}
        alt="Hero Banner"
        className="w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[520px] object-cover transition-all duration-700"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/10 dark:bg-black/40 transition-colors duration-300"></div>

      {/* Left Button */}

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 text-black dark:text-white p-3 rounded-full shadow-xl hover:scale-110 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
      >
        <FaChevronLeft className="text-lg" />
      </button>

      {/* Right Button */}

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 text-black dark:text-white p-3 rounded-full shadow-xl hover:scale-110 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
      >
        <FaChevronRight className="text-lg" />
      </button>

      {/* Slide Indicators */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">

        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? "w-8 h-3 bg-yellow-400"
                : "w-3 h-3 bg-white/70 dark:bg-gray-500"
            }`}
          />
        ))}

      </div>

      {/* Bottom Fade */}

      <div className="absolute bottom-0 left-0 w-full h-32 sm:h-40 bg-gradient-to-t from-[#eaeded] dark:from-[#111827] to-transparent transition-colors duration-300"></div>

    </section>
  );
}

export default Hero;