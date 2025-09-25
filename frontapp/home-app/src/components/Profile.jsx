import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleManageAccount = (e) => {
    e.preventDefault();
    navigate('/modify_profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
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
  );
};

export default Profile;
