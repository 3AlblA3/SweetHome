import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const first_name = data.get("first-name");
    const last_name = data.get("last-name");
    const email = data.get("email");
    const number = data.get("number");
    const password = data.get("password");

    try {
      const response = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name, last_name, email, number, password })
      });
      if (response.ok) {
        navigate('/sign');
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Registration failed");
      }
    } catch (err) {
      alert("Network error");
    }
  }

  return (
    <div class="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-blue-400">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Welcome to our residency. It's a pleasure to welcome you among us.</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm justify-center">
  <form action="#" method="POST" class="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label for="first-name" class="block text-sm/6 font-medium text-gray-100">First Name</label>
        <div class="mt-2">
          <input id="first-name" type="name" name="first-name" required autocomplete="first-name" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <label for="last-name" class="block text-sm/6 font-medium text-gray-100">Last Name</label>
        <div class="mt-2">
          <input id="last-name" type="name" name="last-name" required autocomplete="last-name" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-100">Email</label>
        <div class="mt-2">
          <input id="email" type="email" name="email" required autocomplete="email" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>
      <div>
        <label for="number" class="block text-sm/6 font-medium text-gray-100">Phone</label>
        <div class="mt-2">
          <input id="number" type="text" name="number" required class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>
        </div>
        <div class="mt-2">
          <input id="password" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-100"> Confirm Password</label>
        </div>
        <div class="mt-2">
          <input id="password" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign up</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-100">
      Already one of us? 
      <Link to="/sign" className="underline" font-bold> Log in</Link>
    </p>
  </div>
</div>
  )
}

export default Register;


