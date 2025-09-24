import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle form submission, e.g., send data to your server
    // After successful saving, navigate to the homepage
    navigate('/modify_profile');
  }

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Welcome to your profile.</h2>
  </div>

<div class="mx-auto right-0 mt-2 w-60">
    <div class="bg-white rounded overflow-hidden shadow-lg">
        <div class="text-center p-6 bg-sky-400 border-b">
                    <div class="shrink-0 mt-5">
                        <img aria-hidden="true" role="img" class="h-24 w-24 text-white rounded-full mx-auto" width="32" height="32"  src="" alt="Current profile photo"/>
                    </div> 
                    <p class="pt-2 text-lg font-semibold text-gray-50">John Doe</p>
                    <p class="text-sm text-gray-100">John.Doe@test.com</p>
                    <div class="mt-5">
                        <form onSubmit={handleSubmit}>
                            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Manage your account</button>
                        </form>
                    </div>
                    <div>
                        <button type="submit" class="mt-5 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"><Link to="/modify_password" font-bold>change your password</Link></button>
                    </div>
                    </div>
                    
    </div>
</div>

</div>
  )
}

export default Profile;



