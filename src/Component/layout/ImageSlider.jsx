import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,             
      autoplaySpeed: 3000,        
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    };
  
    const images = [
      "/img2.jpg",
      "/img3.jpg",
      "/img4.jpg",
      "/img5.jpg"
    ];
  
    return (
      <div className="mt-10 px-8 cursor-grab">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="p-2">
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full lg:h-[35vh] h-[25vh] rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default ImageSlider;
