import React from 'react';
import { useAuth } from './context/authContext'; 
import { useCartAndFilters } from './context/Context'; 
import { Link } from 'react-router-dom'; 
import { FaShoppingCart } from 'react-icons/fa'; 
import logo from "/logo.png"

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCartAndFilters();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0); 

  return (
    <nav className="p-4 bg-white text-black flex items-center justify-between">
      <Link to={"/"} className="text-xl font-bold">
      <img src={logo} width={80} alt="logo" /></Link>
      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative flex items-center">
          <FaShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full px-2 py-1">
              {totalItems}
            </span>
          )}
        </Link>
        <div className="relative">
          {user ? (
            <div className="flex items-center gap-4 cursor-pointer group">
              <span>{user.name}</span>
              <div className="absolute right-0 top-6 z-50 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <Link
                  to="/my-booking"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  My Booking
                </Link>
                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
