import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO,DEFAULT_PROFILE_PICTURE } from "../utils/constant";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  useState(() => {
    console.log("1. Use State & auth chnge -", auth);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("3. Use State & auth chnge -", auth);
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        console.log("4. Use State & auth chnge -", auth);
        dispatch(removeUser(null));
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
      <img
        className="w-48"
        src = {NETFLIX_LOGO}F
        alt="netflix-logo"
      />
      {user && (
        <div className="flex">
          <img
            className="h-8 w-8 m-4 rounded-lg"
            alt="profile-pic"
            src= {DEFAULT_PROFILE_PICTURE}
          ></img>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm p-2  m-4 rounded h-8 w-auto"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
