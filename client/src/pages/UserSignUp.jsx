import React, { useState } from "react";
import axios from "axios";

function UserSignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: 3
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      setSuccess('Signup Successful!');
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: 3
      });
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Signup Failed');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center lg:bg-[url('/src/assets/bgimage2.svg')]">
      {success && (
        <div className="fixed top-0 left-0 right-0 bg-green-600 text-white text-center text-2xl py-4 z-50 animate-pulse">
          {success}
        </div>
      )}
      {error && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center text-2xl py-4 z-50 animate-pulse">
          {error}
        </div>
      )}
      
      <div className="flex w-10/12 lg:w-6/12 max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full lg:w-6/12 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-orange-500 mb-6">
            Welcome to Seatr
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="Enter Your Full Name"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="Enter Mobile Number"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="Enter Email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="Enter A Strong Password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white font-medium rounded-lg text-sm px-5 py-3 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Already Have An Account?{" "}
            <a href="/" className="text-orange-500 hover:underline font-medium">
              Login
            </a>
          </p>
        </div>

        <div className="hidden lg:flex w-full lg:w-6/12 p-8 flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Create Account
          </h2>
          <p className="text-gray-800 mb-6 font-bold">
            What does Seatr provide?
          </p>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2 text-orange-500 font-bold">•</span>
              Browse and search for nearby restaurants.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-orange-500 font-bold">•</span>
              View real-time table availability.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-orange-500 font-bold">•</span>
              Book tables online.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-orange-500 font-bold">•</span>
              Rate and write reviews for restaurants.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserSignUp;