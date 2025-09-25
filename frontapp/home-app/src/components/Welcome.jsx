import React from "react"; 
import Header from "./Header";
import bgImage from "../images/building.jpg";
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
    <>
      <Header />
      <div className="flex justify-center items-center min-h-[90vh] bg-blue-400">
        <div
          className="rounded-xl shadow-xl p-8 flex flex-col items-center w-full max-w-3xl min-h-[60vh]"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-8">
            Welcome to our residency please log in <br /> to connect to our information
          </h2>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="flex space-x-4 mt-4 absolute">
              <button
                className="bg-blue-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-brandBlue-500"
                onClick={handleLoginSubmit}  // must be onClick
              >
                Log in
              </button>
              <button
                className="bg-blue-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-brandBlue-500"
                onClick={handleRegisterSubmit}  // must be onClick
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
