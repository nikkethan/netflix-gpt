import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInFlag, setIsSignInFlag] = useState(true);
  const toggleIsSignIn = () => {
    setIsSignInFlag(!isSignInFlag);
  };

  return (
    <>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/5e16108c-fd30-46de-9bb8-0b4e1bbbc509/29d8d7d7-83cc-4b5f-aa9b-6fd4f68bfaa6/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="neflix-login-bg"
        />
      </div>

      <form className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold p-2 m-2">
          {isSignInFlag ? "Sign In" : "Sign Up"}
        </h1>
        {isSignInFlag && (
          <input
            className="bg-stone-800 p-2 m-2 w-full rounded-sm"
            type="text"
            name="Name"
            placeholder="Name"
          />
        )}

        <input
          className="bg-stone-800 p-2 m-2 w-full rounded-sm"
          type="text"
          name="email"
          placeholder="Email Address"
        />
        <input
          className="bg-stone-800 p-2 m-2 w-full rounded-sm"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          className="bg-red-600 p-2 m-2 w-full rounded-sm"
          type="submit"
          name="signin"
        >
          {isSignInFlag ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer" onClick={toggleIsSignIn}>
          {isSignInFlag
            ? "New User. Please sign up."
            : "Already User. Please sign In."}
        </p>
      </form>
    </>
  );
};

export default Login;
