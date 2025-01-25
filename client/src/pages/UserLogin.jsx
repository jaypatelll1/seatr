import React from "react";

function UserLogin() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center lg:bg-[url('/src/assets/bgimage2.svg')]">
      <div className="flex flex-wrap w-10/12 lg:w-6/12 max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section: Login Form */}
        <div className="w-full lg:w-6/12 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-orange-500 mb-6">
            Welcome to SeatR
          </h2>
          <form className="space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="Enter Email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="Enter A Strong Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-medium rounded-lg text-sm px-5 py-3 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <a href="#" className="text-orange-500 hover:underline font-medium">
              Register
            </a>
          </p>
        </div>

        {/* Right Section: Information */}
        <div className="hidden lg:flex w-full lg:w-6/12  p-8 flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Create Account
          </h2>
          <p className="text-gray-800 mb-6 font-medium text-md">What does Seatr provide?</p>
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

export default UserLogin;
