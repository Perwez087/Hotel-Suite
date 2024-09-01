import React, { createContext, useContext, useReducer, useState } from 'react';

const CartAndFilterContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
      }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'INCREMENT_ITEM':
      return { ...state, cart: state.cart.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      ) };
    case 'DECREMENT_ITEM':
      return { ...state, cart: state.cart.map(item =>
        item.id === action.payload ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      ) };
    default:
      return state;
  }
};

export const CartAndFilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });
  const [selectedFilters, setSelectedFilters] = useState({
    location: [],
    price: [0, 500],
    bedrooms: [],
    amenities: []
  });

  const handleCheckboxChange = (e, filterType) => {
    const { value, checked } = e.target;
    setSelectedFilters(prevState => {
      const updatedFilters = { ...prevState };
      if (checked) {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      } else {
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value);
      }
      return updatedFilters;
    });
  };

  const handlePriceChange = (values) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      price: values
    }));
  };

  const applyFilters = (hotels) => {
    const [minPrice, maxPrice] = selectedFilters.price;
    return hotels.filter(hotel => {
      const locationMatch = !selectedFilters.location.length || selectedFilters.location.includes(hotel.location);
      const priceMatch = hotel.price >= minPrice && hotel.price <= maxPrice;
      const bedroomsMatch = !selectedFilters.bedrooms.length || selectedFilters.bedrooms.includes(hotel.bedrooms.toString());
      const amenitiesMatch = !selectedFilters.amenities.length || selectedFilters.amenities.every(amenity => hotel.amenities.includes(amenity));

      return locationMatch && priceMatch && bedroomsMatch && amenitiesMatch;
    });
  };

  return (
    <CartAndFilterContext.Provider value={{
      cart: state.cart,
      dispatch,
      selectedFilters,
      handleCheckboxChange,
      handlePriceChange,
      applyFilters
    }}>
      {children}
    </CartAndFilterContext.Provider>
  );
};

export const useCartAndFilters = () => useContext(CartAndFilterContext);
