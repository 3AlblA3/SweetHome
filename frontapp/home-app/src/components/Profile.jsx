import { Link, useNavigate } from 'react-router-dom';
import logoImage from "../images/home.webp";
import userAvatar from "../images/image.webp";

const Profile = () => {
  const navigate = useNavigate();

  const handleManageAccount = (e) => {
    e.preventDefault();
    navigate('/modify_profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-200 flex flex-col ">
      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-6 bg-white shadow-md">
        <div className="flex items-center space-x-4">
        <Link to="/dashboard">
    <img src={logoImage} alt="Logo" className="w-12 h-12 object-cover" />
  </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 rounded mr-4 md:mr-15 text-sm md:text-base">
            Disconnect
          </Link>
          <div className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center overflow-hidden">
            <img alt="User Avatar" src={userAvatar} />
          </div>
        </div>
      </header>

      {/* Profile Card */}
      <div className="flex items-start justify-center min-h-screen p-4 pt-30">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 ">
        <div className="flex flex-col items-center">
          <img
            src="/path-to-profile-photo.jpg"
            alt="Profile Picture"
            className="rounded-full w-32 h-32 object-cover border-4 border-indigo-500"
          />
          <h1 className="mt-4 text-3xl font-semibold text-gray-800">John Doe</h1>
          <p className="text-sm text-gray-500">John.Doe@test.com</p>
        </div>

        <form className="mt-8" onSubmit={handleManageAccount}>
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
          >
            Manage Your Account
          </button>
        </form>

        <Link
          to="/modify_password"
          className="block w-full text-center mt-4 py-3 rounded-md bg-gray-100 text-indigo-600 font-semibold hover:bg-gray-200 transition"
        >
          Change Your Password
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Profile;
