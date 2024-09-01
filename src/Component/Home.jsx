import React from 'react';
import Cards from '../pages/Cards';
import img from '/img1.jpg';
import { FaWifi } from "react-icons/fa";
import { LuSpade } from "react-icons/lu";
import { MdOutlineLocalDining } from "react-icons/md";
import { FaBellConcierge } from "react-icons/fa6";

const features = [
  {
    icon: <FaWifi size={20} />,
    title: 'Free High-Speed WiFi',
    description: 'Stay connected with our fast and reliable internet.',
  },
  {
    icon: <LuSpade size={20} />,
    title: 'Luxury Spa Services',
    description: 'Indulge in our world-class spa treatments.',
  },
  {
    icon: <MdOutlineLocalDining size={25} />,
    title: 'Gourmet Dining',
    description: 'Savor delicious cuisine at our award-winning restaurants.',
  },
  {
    icon: <FaBellConcierge size={22} />,
    title: 'Dedicated Concierge',
    description: 'Let our concierge team assist you with all your needs.',
  }
];

const Home = () => {
  return (
    <div className="flex flex-col bg-gray-50">
      <section 
        className="w-full py-10 sm:py-16 lg:py-24 bg-cover bg-center relative" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(${img})`
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mx-auto text-center space-y-6 py-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tighter">
              Find Your Perfect Hotel
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-200">
              Search from thousands of hotels and book your stay with ease.
            </p>
          </div>
        </div>
      </section>
      <Cards />
      <section className="w-full py-10 sm:py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tighter">
                Why Choose Hotel Suites?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600">
                Discover the unique features that make our hotels stand out.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className='w-10 h-10 flex items-center justify-center'>
                    {feature.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
