import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoImage from "../images/home.webp";
import userAvatar from "../images/image.webp";

const Modify_Password = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here if needed
    navigate("/homepage");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-50  flex flex-col">
  {/* Header */}
  <header className="flex justify-between items-center p-4 md:p-6 bg-white shadow-md">
    <div className="flex items-center space-x-4">
    <Link to="/dashboard">
    <img src={logoImage} alt="Logo" className="w-12 h-12 object-cover" />
  </Link>
    </div>
    <div className="flex items-center space-x-4">
      <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Disconnect
      </Link>
      <div className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center overflow-hidden">
        <img alt="User Avatar" src={userAvatar} />
      </div>
    </div>
  </header>

  <div className="flex items-start justify-center space-x-10 px-8">
  <h2 className="text-white text-4xl font-bold mb-0 max-w-xl">
    Change Your Password
  </h2>
  </div>


      <div className="flex items-start justify-center p-4 pt-20">
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-10 bg-white rounded-2xl p-10 shadow-2xl">
        {/* Old Password */}
        <div className="flex flex-col space-y-3">
          <label htmlFor="oldPassword" className="text-gray-700 font-semibold">
            Old Password
          </label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="password"
            required
            placeholder="Enter your old password"
            value={formData.oldPassword}
            onChange={handleChange}
            className="px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-800 text-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />
        </div>

        {/* New Password */}
        <div className="flex flex-col space-y-3">
          <label htmlFor="newPassword" className="text-gray-700 font-semibold">
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            placeholder="Enter your new password"
            value={formData.newPassword}
            onChange={handleChange}
            className="px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-800 text-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />
        </div>

        {/* Confirm New Password */}
        <div className="flex flex-col space-y-3">
          <label htmlFor="confirmNewPassword" className="text-gray-700 font-semibold">
            Confirm New Password
          </label>
          <input
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            required
            placeholder="Confirm your new password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className="px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-800 text-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 py-5 rounded-xl text-white font-semibold text-xl hover:bg-indigo-500 transition shadow-lg"
        >
          Save
        </button>
      </form>
      </div>
    </div>
  );
};

export default Modify_Password;
