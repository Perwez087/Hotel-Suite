import React, { useEffect } from 'react';
import { useAuth } from '../Component/context/authContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }
  useEffect(() => {
    document.title = 'Profile - Hotel';
  }, []);

  return (
    <div className='h-[80vh]'>
      <div className='px-10 py-6'>
        <Link to={"/hotels"} className='hover:underline hover:text-orange-400'>
          Back
        </Link>
      </div>
      <div className="max-w-lg mx-auto mt-10 p-4 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Name:</h3>
          <p className="text-gray-700">{user.name}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Email:</h3>
          <p className="text-gray-700">{user.email}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Additional Info:</h3>
          <p className="text-gray-700">{user.additionalInfo || 'No additional information provided.'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
