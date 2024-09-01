import React from 'react';
import { useAuth } from '../Component/context/authContext';
import toast from 'react-hot-toast'; 

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out successfully.'); 
    
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default Logout;
