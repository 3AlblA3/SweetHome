import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyApp</h1>
        <nav className="flex space-x-6">
          <button
            onClick={() => navigate("/sign")}
            className="px-6 py-3 text-lg font-semibold rounded-md bg-brandBlue text-white hover:bg-brandBlue-500"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 text-lg font-semibold rounded-md bg-brandBlue text-white hover:bg-brandBlue-500"
          >
            Sign up
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
