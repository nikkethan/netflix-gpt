import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { DEFAULT_PROFILE_PICTURE } from "../utils/constant";

const Login = () => {
  const navigate = useNavigate();

  const [isSignUpFlag, setIsSignUpFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const emailId = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const validateForm = () => {
    console.log(emailId.current.value);
    const message = checkValidData(
      emailId.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (errorMessage) return;
    if (isSignUpFlag) {
      createUserWithEmailAndPassword(
        auth,
        emailId.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: DEFAULT_PROFILE_PICTURE,
          })
            .then(() => {
              console.log("Sign Up -{}", auth);
              // const { uid, email, displayName, photoURL } = auth.currentUser;
              // dispatch(
              //   addUser({
              //     uid: uid,
              //     email: email,
              //     displayName: displayName,
              //     photoURL: photoURL,
              //   })
              // );
              console.log("Sign Up -{}", user);
            })
            .catch((error) => {
              navigate("/error");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        emailId.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Sign In -{}", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };

  const toggleIsSignIn = () => {
    setIsSignUpFlag(!isSignUpFlag);
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

      <form
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold p-2 m-2">
          {!isSignUpFlag ? "Sign In" : "Sign Up"}
        </h1>
        {isSignUpFlag && (
          <input
            className="bg-stone-800 p-2 m-2 w-full rounded-sm"
            type="text"
            name="Name"
            ref={name}
            placeholder="Name"
          />
        )}

        <input
          className="bg-stone-800 p-2 m-2 w-full rounded-sm"
          type="text"
          ref={emailId}
          name="email"
          placeholder="Email Address"
        />
        <input
          className="bg-stone-800 p-2 m-2 w-full rounded-sm"
          type="password"
          ref={password}
          name="password"
          placeholder="Password"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="bg-red-600 p-2 m-2 w-full rounded-sm"
          name="signin"
          onClick={validateForm}
        >
          {!isSignUpFlag ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer" onClick={toggleIsSignIn}>
          {!isSignUpFlag
            ? "New User. Please sign up."
            : "Already User. Please sign In."}
        </p>
      </form>
    </>
  );
};

export default Login;
