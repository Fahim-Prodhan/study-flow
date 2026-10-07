import React from "react";
import { LuNotebookPen } from "react-icons/lu";
import { Link } from "react-router";
import { toast } from "react-toastify";

const SignUp = () => {

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Function submit triggered");
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        },
      );
      const data = await response.json();
      console.log(data, "data");
      if (data.success) {
        toast.success(
          data.message || "Account created successfully! Please log in.",
        );
      } else {
        throw new Error(data.message || "Failed to create account.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <span className="inline-block bg-[#0e7c66] p-3 rounded-full">
            <LuNotebookPen className="text-white h-[35px] w-[35px]" />
          </span>

          <h1 className="text-3xl font-bold text-white mt-5">Create Account</h1>

          <p className="text-slate-400 mt-2">
            Sign up to continue to your account
          </p>
        </div>

        {/* Sign In Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 shadow-2xl">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Name
              </label>

              <input
                type="text"
                placeholder="Your name"
                name="name"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                name="email"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>
              </div>

              <input
                type="password"
                placeholder="••••••••"
                name="password"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition duration-200 shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-slate-800"></div>
            <span className="text-sm text-slate-500">OR</span>
            <div className="h-px flex-1 bg-slate-800"></div>
          </div>

          {/* Sign Up */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          © 2026 Your App. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
