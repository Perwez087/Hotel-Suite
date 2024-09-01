import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import img from "/img1.jpg";
import { Link } from "react-router-dom";
import AccommodationSection from "./Accomodation";
import Promotion from "./Promotion";

const HeroSection = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "WITH A VIEW",
        "BY THE SEA",
        "TO REMEMBER"
      ], 
      typeSpeed: 50, 
      backSpeed: 30, 
      loop: true, 
      showCursor: true,
      cursorChar: "|", 
    };

    const typed = new Typed(typedElement.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    document.title = 'Welcome - Hotel Suite';
}, []);

  return (
    <div className="bg-white">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="md:w-1/2 p-8 md:p-16">
          <div className="text-4xl md:text-6xl font-bold text-orange-500 mb-6">
            <h1>
              BOOK A ROOM
            </h1>
            <span ref={typedElement}></span> 
          </div>
          <p className="text-orange-900 mb-8">
            Discover a world of comfort, luxury, and unparalleled hospitality at Hoteller.
            Nestled in the heart of the city, our exquisite hotel is your home away from
            home, where every stay is a memorable experience.
          </p>
          <Link to={"/hotels"} className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-700">
            BOOK YOUR STAY NOW
          </Link>
        </div>

        <div className="md:w-1/2 relative">
          <img
            src={img}
            alt="Hotel Room"
            className="w-full h-full object-cover rounded-bl-3xl"
          />
        </div>
      </div>
      <div>
        <AccommodationSection/>
      </div>
      <div>
        <Promotion/>
      </div>
    </div>
  );
};

export default HeroSection;
