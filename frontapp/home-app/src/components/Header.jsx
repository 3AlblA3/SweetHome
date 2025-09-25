import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../images/home.webp"; 

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-3">
          <div className="w-15 h-15 rounded-full bg-blue-200 overflow-hidden flex items-center justify-center">
            <img
              src={logoImage}
              alt="Logo"
              className="w-10 h-10 object-cover"
            />
          </div>
        </div>
        <nav className="flex space-x-6">
          <button
            onClick={() => navigate("/sign")}
            className="px-6 py-3 text-lg font-semibold rounded-md bg-blue-400 text-white hover:bg-blue-200"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 text-lg font-semibold rounded-md bg-blue-400 text-white hover:bg-blue-200"
          >
            Sign up
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
