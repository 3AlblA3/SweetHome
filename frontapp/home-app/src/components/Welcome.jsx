import React from "react";
import bgImage from "../images/apart.jpg";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = () => {
    navigate("/sign");
  };

  const handleRegisterSubmit = () => {
    navigate("/register");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-16"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay if needed for readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content above the overlay */}
      <div className="relative z-10 max-w-3xl text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 drop-shadow-lg">
          Welcome to our residency, please log in to connect to our information
        </h2>
        <div className="flex justify-center space-x-6">
          <button
            onClick={handleLoginSubmit}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-semibold shadow-lg transition"
          >
            Log in
          </button>
          <button
            onClick={handleRegisterSubmit}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-semibold shadow-lg transition"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
