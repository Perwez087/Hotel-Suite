import React, { useState } from 'react';
import { useCartAndFilters } from '../Component/context/Context';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';

const Checkout = () => {
  const { cart, dispatch } = useCartAndFilters();
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d{0,10}$/.test(value)) return; 

    setContactInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber" && !/^\d{0,16}$/.test(value)) return; 
    if (name === "expirationDate") {
      let formattedValue = value.replace(/[^0-9]/g, ''); 
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }
      setPaymentInfo(prevState => ({ ...prevState, [name]: formattedValue }));
      return;
    }
    if (name === "cvv" && !/^\d{0,3}$/.test(value)) return; 
    setPaymentInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contactInfo.phone.length !== 10) {
      toast.error("Phone number must be 10 digits.");
      return;
    }
    if (paymentInfo.cardNumber.length !== 16) {
      toast.error("Card number must be 16 digits.");
      return;
    }
    if (paymentInfo.expirationDate.length !== 5 || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfo.expirationDate)) {
      toast.error("Expiration date must be in the format MM/YY.");
      return;
    }
    if (paymentInfo.cvv.length !== 3) {
      toast.error("CVV must be 3 digits.");
      return;
    }

    const orderDetails = {
      contactInfo,
      paymentInfo,
      cart,
      checkInDate,
      checkOutDate,
      totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0)
    };

    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    dispatch({ type: 'CLEAR_CART' });

    toast.success('Order placed successfully!');
    window.location.href = '/my-booking'; 
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const today = new Date();

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg bg-white">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <label className="block mb-2">
            <span className="text-gray-700">Name:</span>
            <input
              type="text"
              name="name"
              value={contactInfo.name}
              onChange={handleContactChange}
              className="block w-full mt-1 p-2 border rounded"
              required
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Email:</span>
            <input
              type="email"
              name="email"
              value={contactInfo.email}
              onChange={handleContactChange}
              className="block w-full mt-1 p-2 border rounded"
              required
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Phone:</span>
            <input
              type="tel"
              name="phone"
              value={contactInfo.phone}
              onChange={handleContactChange}
              className="block w-full mt-1 p-2 border rounded"
              required
              maxLength="10"
              pattern="\d{10}"
              title="Phone number must be 10 digits"
            />
          </label>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Booking Dates</h3>
          <label className="block mb-2">
            <span className="text-gray-700">Check-in Date:</span>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              className="block w-full mt-1 p-2 border rounded"
              placeholderText="Select check-in date"
              required
              minDate={today}
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Check-out Date:</span>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              className="block w-full mt-1 p-2 border rounded"
              placeholderText="Select check-out date"
              required
              minDate={today}
            />
          </label>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
          <label className="block mb-2">
            <span className="text-gray-700">Card Number:</span>
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handlePaymentChange}
              className="block w-full mt-1 p-2 border rounded"
              required
              maxLength="16"
              pattern="\d{16}"
              title="Card number must be 16 digits"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Expiration Date (MM/YY):</span>
            <input
              type="text"
              name="expirationDate"
              value={paymentInfo.expirationDate}
              onChange={handlePaymentChange}
              className="block w-full mt-1 p-2 border rounded"
              required
              pattern="^(0[1-9]|1[0-2])\/\d{2}$"
              title="Expiration date must be in the format MM/YY"
              placeholder="MM/YY"
              maxLength="5"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">CVV:</span>
            <input
              type="text"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handlePaymentChange}
              className="block w-full mt-1 p-2 border rounded"
              required
              maxLength="3"
              pattern="\d{3}"
              title="CVV must be 3 digits"
            />
          </label>
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">Total:</span>
            <span className="font-bold text-gray-800">${totalAmount.toFixed(2)}</span>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
