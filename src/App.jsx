import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Component/context/authContext';
import Home from './Component/Home';
import Login from './pages/Login';
import CartPreview from './pages/CartPreview';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import MyBooking from './pages/MyBooking';
import Navbar from './Component/Navbar';
import PrivateRoutes from './Component/Routes/PrivateRoutes';
import HeroSection from './Component/layout/HeroSection';
import Footer from './Component/Footer';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/hotels" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<CartPreview />} />
          
          <Route 
            path="/profile" 
            element={
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <PrivateRoutes>
                <Checkout />
              </PrivateRoutes>
            } 
          />
          <Route 
            path="/my-booking" 
            element={
              <PrivateRoutes>
                <MyBooking />
              </PrivateRoutes>
            } 
          />
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
};

export default App;
