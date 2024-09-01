import React from "react";
import ImageSlider from "./ImageSlider";

const AccommodationSection = () => {
    return (
        <div>

            <div className="container mx-auto mt-10 px-6">
                <div className="lg:max-w-xl lg:mx-44">
                    <h2 className="lg:text-5xl text-3xl font-extrabold text-[#A54A42] mb-6">
                        ACCOMMODATION AT HOTELLER SUITES
                    </h2>
                    <p className="text-[#A54A42] mb-12 text-justify">
                        Indulge in elegance and relaxation as you step into our beautifully appointed rooms and suites.
                        Whether you’re here for business or leisure, our accommodations offer the perfect blend of modern
                        amenities and classic charm. From cozy standard rooms to spacious suites with breathtaking views,
                        we have a space to suit every traveler’s needs.
                    </p>
                </div>
            </div>
            <ImageSlider />
        </div>
    );
};

export default AccommodationSection;
