import React, { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [stage, setStage] = useState('email');
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: ""
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

  const sendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post('http://localhost:5000/api/passwordreset/send-reset-otp', { 
        email: formData.email 
      });
      setSuccess('OTP sent to your email');
      setStage('verify');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post('http://localhost:5000/api/passwordreset/verify-reset-token', { 
        email: formData.email,
        token: formData.otp
      });
      setSuccess('OTP verified');
      setStage('reset');
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post('http://localhost:5000/api/passwordreset/reset-password', { 
        email: formData.email,
        token: formData.otp,
        newPassword: formData.newPassword
      });
      setSuccess('Password Reset Successful');
      setStage('email');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password');
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
      
      <div className="flex w-10/12 lg:w-6/12 max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-orange-500 mb-6">
            Reset Password
          </h2>
          {stage === 'email' && (
            <form onSubmit={sendOTP} className="space-y-6">
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
                  'Send OTP'
                )}
              </button>
            </form>
          )}
          {stage === 'verify' && (
            <form onSubmit={verifyOTP} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-700">
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="Enter OTP"
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
                  'Verify OTP'
                )}
              </button>
            </form>
          )}
          {stage === 'reset' && (
            <form onSubmit={resetPassword} className="space-y-6">
              <div>
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="Enter New Password"
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
                  'Reset Password'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;