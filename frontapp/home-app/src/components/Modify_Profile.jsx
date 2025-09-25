import { useNavigate, Link } from 'react-router-dom';
import logoImage from "../images/home.webp";
import userAvatar from "../images/image.webp";

const Modify_Profile = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-blue-400 flex flex-col">
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
      <h2 className="text-center text-white text-3xl font-bold mb-12">
        Here you can change your profile.
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto space-y-6 text-gray-900"
        noValidate
      >
        {/* Profile photo */}
        <div className="flex justify-center mb-6">
          <img
            src=""
            alt="Current profile photo"
            className="h-24 w-24 rounded-full object-cover border-4 border-indigo-600"
          />
        </div>

        <label className="block mb-8">
          <span className="sr-only">Choose profile photo</span>
          <input
            type="file"
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
              name="first-name"
              id="first-name"
              required
              autoComplete="given-name"
              placeholder="Write Your First Name"
              className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>
          <label className="flex-1 bg-white rounded-lg p-4 shadow-sm mt-6 md:mt-0">
            <span className="block text-gray-700 font-semibold mb-2">Last Name</span>
            <input
              type="text"
              name="last-name"
              id="last-name"
              required
              autoComplete="family-name"
              placeholder="Write Your Last Name"
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
            className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        {/* Phone number input */}
        <label className="block bg-white rounded-lg p-4 shadow-sm">
          <span className="block text-gray-700 font-semibold mb-2">Phone number</span>
          <input
            type="tel"
            name="phone-number"
            id="phone-number"
            required
            autoComplete="tel"
            placeholder="Write Your Phone number"
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
