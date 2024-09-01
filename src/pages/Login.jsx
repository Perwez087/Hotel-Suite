import React, { useEffect, useState } from 'react';
import { useAuth } from '../Component/context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    login(userData);
    navigate('/');
  };
  useEffect(() => {
    document.title = 'Login - Hotel Suite';
}, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl">
        <div className="bg-gradient-to-r lg:flex flex-col items-center justify-center gap-4 hidden from-red-500 via-orange-500 to-yellow-500 p-8 text-center lg:w-1/2">
          <h2 className="text-4xl font-bold text-white mb-4">WELCOME TO Hotel Suite</h2>
          <p className="text-white mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled.
          </p>
        </div>
        
        <div className="p-8 lg:w-1/2">
          <h2 className="text-3xl font-semibold mb-6">Hotel Suites</h2>
          <h3 className="text-xl font-medium mb-4">Sign In to Your Account</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
