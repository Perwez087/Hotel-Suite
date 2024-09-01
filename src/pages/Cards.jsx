import React, { useEffect } from 'react';
import { Range } from 'react-range';
import hotelsData from '../data.json';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Component/context/authContext';
import { useCartAndFilters } from '../Component/context/Context';
import { FaStar } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast'; 

const Cards = () => {
    const { cart, dispatch, selectedFilters, handleCheckboxChange, handlePriceChange, applyFilters } = useCartAndFilters();
    const { user } = useAuth();
    const navigate = useNavigate();

    const filteredHotels = applyFilters(hotelsData);

    const addToCart = (hotel) => {
        if (!user) {
            toast.error("Please log in first to add items to the cart.");  
            navigate('/login');
            return;
        }
        dispatch({ type: 'ADD_TO_CART', payload: hotel });
        toast.success("Hotel added to cart!");
    };

    const isHotelInCart = (hotelId) => {
        return cart.some(item => item.id === hotelId);
    };

    useEffect(() => {
        document.title = 'Featured - Hotels';
    }, []);
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Toaster position="top-right" /> 
            <div className="flex flex-col md:flex-row">
                <section className="w-full py-10 sm:py-16 lg:py-24">

                    <div className='flex flex-col items-center gap-2 pb-6 text-center'>
                        <h1 className='text-3xl sm:text-4xl font-bold'>Featured Hotels</h1>
                        <p className='text-lg sm:text-2xl text-gray-500'>Discover our top-rated hotels for your next getaway.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/4">
                            <div className="flex flex-col border p-6 bg-gray-100 rounded-lg">
                                <h3 className="font-bold text-lg mb-4">Filters</h3>

                                <div className="mb-6">
                                    <h4 className="font-bold text-md mb-2">Location</h4>
                                    {['Los Angeles, CA', 'Miami, FL', 'New York, NY', 'Patna, BR', 'Mumbai, MH', 'New Delhi, DL'].map(location => (
                                        <label key={location} className="flex items-center gap-2 mb-1">
                                            <input
                                                type="checkbox"
                                                value={location}
                                                onChange={(e) => handleCheckboxChange(e, 'location')}
                                                className="form-checkbox"
                                            />
                                            {location}
                                        </label>
                                    ))}
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-bold text-md mb-2">Price Range</h4>
                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                        <span>${selectedFilters.price[0]}</span>
                                        <span>${selectedFilters.price[1]}</span>
                                    </div>
                                    <Range
                                        step={10}
                                        min={0}
                                        max={500}
                                        values={selectedFilters.price}
                                        onChange={handlePriceChange}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                {...props}
                                                className="relative w-full h-2 bg-gray-200 rounded-lg"
                                            >
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div
                                                {...props}
                                                className="absolute w-6 h-6 bg-orange-600 rounded-full cursor-pointer"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-bold text-md mb-2">Number of Bedrooms</h4>
                                    {[1, 2, 3, 4, 5].map(bedrooms => (
                                        <label key={bedrooms} className="flex items-center gap-2 mb-1">
                                            <input
                                                type="checkbox"
                                                value={bedrooms}
                                                onChange={(e) => handleCheckboxChange(e, 'bedrooms')}
                                                className="form-checkbox"
                                            />
                                            {bedrooms}
                                        </label>
                                    ))}
                                </div>

                                <div>
                                    <h4 className="font-bold text-md mb-2">Amenities</h4>
                                    {['Free Wi-Fi', 'Pool', 'Gym', 'Breakfast Included', 'Beachfront', 'Spa', 'Room Service', '24/7 Service', '3-Star Hotel', 'Rooftop Bar', 'Restaurant', 'Swimming Pool', 'Fitness Center', 'Fine Dining', 'Heritage Property', 'Sea View', 'Butler Service', 'Private Pool', 'Eco-friendly'].map(amenity => (
                                        <label key={amenity} className="flex items-center gap-2 mb-1">
                                            <input
                                                type="checkbox"
                                                value={amenity}
                                                onChange={(e) => handleCheckboxChange(e, 'amenities')}
                                                className="form-checkbox"
                                            />
                                            {amenity}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-3/4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredHotels.map(hotel => (
                                    <div key={hotel.id} className="border rounded-lg p-4 bg-white shadow-md">
                                        <img src={hotel.image} alt={hotel.title} className="w-full h-28 sm:h-32 lg:h-44 object-cover rounded-lg mb-4" />
                                        <div className='flex items-center justify-between mb-1'>
                                            <h3 className="text-xl font-semibold text-orange-600">{hotel.title}</h3>
                                            <div className='flex items-center gap-2 bg-orange-500 text-white rounded-md px-2 py-1'>
                                                <span><FaStar size={15}/></span>
                                                <span className='text-sm font-semibold'>{hotel.rating}</span>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between mb-2'>
                                            <p className="font-bold text-green-600">${hotel.price}</p>
                                            <p className="text-gray-600">{hotel.location}</p>
                                        </div>
                                        <p className="text-gray-600 mb-4">[{hotel.amenities.join(', ')}]</p>
                                        <button
                                            onClick={() => isHotelInCart(hotel.id) ? null : addToCart(hotel)}
                                            className={`px-4 py-2 ${isHotelInCart(hotel.id) ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-700'} text-white rounded-lg`}
                                        >
                                            {isHotelInCart(hotel.id) ? 'Item Already Added' : 'Book'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Cards;
