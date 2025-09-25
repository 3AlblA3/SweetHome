import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoImage from "../images/home.webp";
import userAvatar from "../images/image.webp";
import Header from "./Header";


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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [userId, setUserId] = useState(null);

  // Fetch user id on mount
  useState(() => {
    fetch("http://localhost:5000/users/me", { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data && data.id) setUserId(data.id); });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (!userId) {
      setError("User not loaded.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });
      if (response.ok) {
        setSuccess("Password updated successfully.");
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update password.");
      }
    } catch (err) {
      setError("Server error.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-50  flex flex-col">
  {/* Header */}
    <Header />
  <div className="flex items-start justify-center space-x-10 px-8">
    <h2 className="text-white text-4xl font-bold mb-0 max-w-xl">
      Change Your Password
    </h2>
  </div>
    <div className="flex items-start justify-center p-4 pt-20">
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-10 bg-white rounded-2xl p-10 shadow-2xl">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
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
