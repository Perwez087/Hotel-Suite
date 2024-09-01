import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyBooking = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const storedOrderDetails = localStorage.getItem('orderDetails');
    if (storedOrderDetails) {
      setOrderDetails(JSON.parse(storedOrderDetails));
    } else {
      toast.error('No booking details available.');
    }
  }, []);

  const handleCancelOrder = () => {
    localStorage.removeItem('orderDetails');
    setOrderDetails(null);
    toast.success('Your order has been cancelled.');
  };
  useEffect(() => {
    document.title = 'My Booking - Hotels';
  }, []);

  return (
    <div className='h-screen'>
      <div className='px-10 py-6'>
        <Link to={"/hotels"} className='hover:underline hover:text-orange-400'>
          Back
        </Link>
      </div>
      <div className="max-w-4xl mx-auto mt-10 p-4 border rounded-lg shadow-lg bg-white mb-6">
        <h2 className="text-2xl font-bold mb-4">My Booking</h2>
        {orderDetails ? (
          <div>
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
              <p><strong>Name:</strong> {orderDetails.contactInfo.name}</p>
              <p><strong>Email:</strong> {orderDetails.contactInfo.email}</p>
              <p><strong>Phone:</strong> {orderDetails.contactInfo.phone}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Booking Dates</h4>
              <p><strong>Check-in Date:</strong> {orderDetails.checkInDate ? new Date(orderDetails.checkInDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Check-out Date:</strong> {orderDetails.checkOutDate ? new Date(orderDetails.checkOutDate).toLocaleDateString() : 'N/A'}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Payment Information</h4>
              <p><strong>Card Number:</strong> {orderDetails.paymentInfo.cardNumber}</p>
              <p><strong>Expiration Date:</strong> {orderDetails.paymentInfo.expirationDate}</p>
              <p><strong>CVV:</strong> {orderDetails.paymentInfo.cvv}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Items</h4>
              {orderDetails.cart.map(item => (
                <div key={item.id} className="flex items-center justify-between mb-2">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-1 ml-4">
                    <h5 className="font-semibold text-gray-800">{item.title}</h5>
                    <p className="text-gray-600 text-sm">Price: ${item.price}</p>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">Total:</span>
                <span className="font-bold text-gray-800">${orderDetails.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCancelOrder}
              className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Cancel Order
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-600">No booking details available.</p>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
