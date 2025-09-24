import React from "react";
import { useNavigate } from "react-router-dom";

const Sign = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // Perform login logic here (e.g., API call)
    console.log({ email, password });

    // On successful login, navigate to the dashboard
    navigate("/dashboard");
  }

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Welcome back. It's a delight to see you again.</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form action="#" method="POST" class="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-100">
          Email address
        </label>
        <div class="mt-2">
          <input
            id="email"
            type="email"
            name="email"
            required
            autocomplete="email"
            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm/6 font-medium text-gray-100"
          >
            Password
          </label>
          <div class="text-sm">
            <a
              href="/forgot-password"
              class="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Forgot password?
            </a>
          </div>
        </div>
        <div class="mt-2">
          <input
            id="password"
            type="password"
            name="password"
            required
            autocomplete="current-password"
            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Log in
        </button>
      </div>
    </form>

  </div>
</div>

  )
}

export default Sign;