import React from "react";
import { useNavigate } from "react-router-dom";
import { useTodoContext } from "./TodoContext";

function SignupPage() {
  const navigate = useNavigate();
  const {
    formData,
    setFormData,
    isLoggedIn,
    setIsLoggedIn,
    signInFn,
    signUpFn,
  } = useTodoContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const signInData = { email: formData.email, password: formData.password };
    console.log(signInData);
    const isSignedIn = await signInFn(signInData);
    isSignedIn && navigate("/todo");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSignedUp = await signUpFn();
    isSignedUp && navigate("/todo");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLoggedIn ? "Sign up" : "Sign in"} for an account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) =>
            isLoggedIn ? handleSubmit(e) : handleSignInSubmit(e)
          }
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="flex flex-col gap-4 rounded-md shadow-sm -space-y-px">
            {isLoggedIn && (
              <div>
                <label htmlFor="user" className="sr-only">
                  user
                </label>
                <input
                  id="user"
                  name="user"
                  type="text"
                  autoComplete="Username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="username"
                  value={formData.user}
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              {isLoggedIn
                ? `Already have an Account.`
                : `Don't Have an acount.`}
              <span
                className="text-violet-500 cursor-pointer"
                onClick={() => setIsLoggedIn((prev) => !prev)}
              >
                {isLoggedIn ? `SignIn` : `SignUp`}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoggedIn ? "Sign up" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
