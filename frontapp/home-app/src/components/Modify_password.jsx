import { useNavigate } from 'react-router-dom';

const Modify_Password = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle form submission, e.g., send data to your server
    // After successful saving, navigate to the homepage
    navigate('/homepage');
  }

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Here you change your password.</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm justify-center">
    <form action="#" method="POST" class="space-y-6">
  <div>

</div>

<label class="relative block p-3 border-2 mt-5 border-black rounded bg-white" htmlFor="name">
      <span class="text-md font-semibold text-zinc-900" htmlFor="name">
    Old Password
  </span>

  <input class="w-full   p-0 text-sm border-none bg-white text-gray-500 focus:outline-none" id="old_password" type="password" name="old_password" required autocomplete="old_password" placeholder="Write Your Old Password" />
</label>

<label class="relative block p-3 border-2 mt-5 border-black rounded bg-white" htmlFor="name">
      <span class="text-md font-semibold text-zinc-900" htmlFor="name">
    New Password
  </span>

  <input class="w-full   p-0 text-sm border-none bg-white text-gray-500 focus:outline-none" id="new_password" type="password" name="new_password" required autocomplete="new_password" placeholder="Write Your New Password" />
</label>

<label class="relative block p-3 border-2 mt-5 border-black rounded bg-white" htmlFor="name">
      <span class="text-md font-semibold text-zinc-900" htmlFor="name">
    Confirm New Password
  </span>

  <input class="w-full   p-0 text-sm border-none bg-white text-gray-500 focus:outline-none" id="confirm_new_password" type="password" name="confirm_new_password" required autocomplete="confirm_new_password" placeholder="Confirm your New Password" />
</label>

     <div>
        <form onSubmit={handleSubmit}>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
        </form>
      </div>
    </form>

  </div>
</div>
  )
}

export default Modify_Password;



