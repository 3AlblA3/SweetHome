import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logoImage from "../images/home.webp";
import userAvatar from "../images/image.webp";

const Modify_Profile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    number: '',
    picture: null,
  });
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user id and profile data on mount
  useEffect(() => {
    fetch("http://localhost:5000/users/me", { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.id) {
          setUserId(data.id);
          // Fetch full user info
          fetch(`http://localhost:5000/users/${data.id}`, { credentials: "include" })
            .then(r => r.ok ? r.json() : null)
            .then(user => {
              if (user) {
                setFormData(i => ({
                  ...i,
                  first_name: user.first_name || '',
                  last_name: user.last_name || '',
                  email: user.email || '',
                  number: user.number || '',
                }));
                if (user.picture_url) setProfilePicUrl(user.picture_url);
              }
            });
        }
      });
  }, []);
  
    const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        navigate("/");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      alert("Logout error");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files && files[0]) {
      setFormData({ ...formData, picture: files[0] });
      setProfilePicUrl(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (!userId) {
      setError("User not loaded.");
      return;
    }
    try {
      const form = new FormData();
      form.append("first_name", formData.first_name);
      form.append("last_name", formData.last_name);
      form.append("email", formData.email);
      form.append("number", formData.number);
  if (formData.picture) form.append("image_url", formData.picture);

      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        credentials: "include",
        body: form,
      });
      if (response.ok) {
        setSuccess("Profile updated successfully.");
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update profile.");
      }
    } catch (err) {
      setError("Server error.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-400 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-6 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <img src={logoImage} alt="Logo" className="ml-4 md:ml-15 w-10 md:w-12 h-10 md:h-12 object-cover" />
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 rounded mr-4 md:mr-15 text-sm md:text-base"
          >
            Disconnect
          </button>
          <div className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center overflow-hidden">
            <img alt="User Avatar" src={userAvatar} />
          </div>
        </div>
      </header>
      <h2 className="text-center text-white text-3xl font-bold mb-12">
        Here you can change your profile.
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto space-y-6 text-gray-900"
        noValidate
      >
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {/* Profile photo */}
        <div className="flex justify-center mb-6">
          <img
            src={profilePicUrl || userAvatar}
            alt="Current profile photo"
            className="h-24 w-24 rounded-full object-cover border-4 border-indigo-600"
          />
        </div>

        <label className="block mb-8">
          <span className="sr-only">Choose profile photo</span>
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-200
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-600 file:text-white
                      hover:file:bg-indigo-500"
          />
        </label>

        {/* Inputs for first and last name side by side */}
        <div className="flex flex-col md:flex-row md:space-x-6">
          <label className="flex-1 bg-white rounded-lg p-4 shadow-sm">
            <span className="block text-gray-700 font-semibold mb-2">
              First Name
            </span>
            <input
              type="text"
              name="first_name"
              id="first_name"
              required
              autoComplete="given-name"
              placeholder="Write Your First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>
          <label className="flex-1 bg-white rounded-lg p-4 shadow-sm mt-6 md:mt-0">
            <span className="block text-gray-700 font-semibold mb-2">Last Name</span>
            <input
              type="text"
              name="last_name"
              id="last_name"
              required
              autoComplete="family-name"
              placeholder="Write Your Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>
        </div>

        {/* Email input */}
        <label className="block bg-white rounded-lg p-4 shadow-sm">
          <span className="block text-gray-700 font-semibold mb-2">Email</span>
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="email"
            placeholder="Write Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        {/* Phone number input */}
        <label className="block bg-white rounded-lg p-4 shadow-sm">
          <span className="block text-gray-700 font-semibold mb-2">Phone number</span>
          <input
            type="tel"
            name="number"
            id="number"
            required
            autoComplete="tel"
            placeholder="Write Your Phone number"
            value={formData.number}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-500 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Modify_Profile;
