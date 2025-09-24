import { useNavigate } from 'react-router-dom';

const Modify_Profile = () => {
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
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Here you can change your profile.</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm justify-center">
    <form action="#" method="POST" class="space-y-6">
          <div class="shrink-0 mt-5">
            <img class="h-20 w-20 object-cover rounded-full" src="" alt="Current profile photo"/>
        </div> 
        <label class="block pt-2">
            <span class="sr-only t-2">Choose profile photo</span>
            <input type="file" class="w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-500 file:text-sm/6 font-medium text-white
              hover:file:bg-indigo-400
            "/>
      </label>
  <div>

</div>

<label class="relative block p-3 border-2 mt-5 border-black rounded bg-white" htmlFor="name">
      <span class="text-md font-semibold text-zinc-900" htmlFor="name">
    First Name
  </span>

  <input class="w-full   p-0 text-sm border-none bg-white text-gray-500 focus:outline-none" id="first-name" type="name" name="first-name" required autocomplete="first-name" placeholder="Write Your First Name" />
</label>

<label class="relative block p-3 border-2 mt-5 border-black rounded bg-white" htmlFor="name">
      <span class="text-md font-semibold text-zinc-900" htmlFor="name">
    Last Name
  </span>

  <input class="w-full   p-0 text-sm border-none bg-white text-gray-500 focus:outline-none" id="last-name" type="name" name="last-name" required autocomplete="last-name" placeholder="Write Your Last Name" />
</label>

<label class="relative block p-3 border-2 mt-5 border-black rounded bg-white" htmlFor="name">
      <span class="text-md font-semibold text-zinc-900" htmlFor="name">
    Email
  </span>

  <input class="w-full   p-0 text-sm border-none bg-white text-gray-500 focus:outline-none" id="email" type="email" name="email" required autocomplete="email" placeholder="Write Your Email" />
</label>

<label class="relative block p-3 border-2 mt-5 border-black rounded bg-white" htmlFor="name">
      <span class="text-md font-semibold text-zinc-900" htmlFor="name">
    Phone number
  </span>

  <input class="w-full   p-0 text-sm border-none bg-white text-gray-500 focus:outline-none" id="phone-number" type="text" name="phone-number" required autocomplete="phone-number" placeholder="Write Your Phone number" />
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

export default Modify_Profile;



