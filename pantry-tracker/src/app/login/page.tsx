"use client";
import React, { useState } from "react";
import "./logincss.css";
import { app } from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const Login = () => {
  const [currentpage, setCurrentpage] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<String | null>(null);
  const auth = getAuth(app);
  async function createuser(e: any) {
    e.preventDefault();
    if (email == "" || password == "") {
      setError("Please  Enter Email And Password");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("Successfully Created the User");
        console.log("response :", res);
      })
      .catch((error) => {
        setError("Invalid Credentials");
        console.log("error", error);
      });
  }
  function signin(e: any) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("Successfully Sigin the User");
        console.log("response :", res);
      })
      .catch((error) => {
        setError("Invalid Credentials");
        console.log("error", error);
      });
  }
  return (
    <>
      <main>
        <div className="login-ccontainer flex justify-center items-center flex-col min-h-80 ">
          <h1 className=" text-white font-bold text-2xl">
            {" "}
            {currentpage == "Login" ? "Login" : "SignUp"}
            Page
          </h1>
          <form
            className="flex flex-col xl-w-1/3 md:w-1/2 sm:w-11/12"
            onSubmit={(e) => {
              if (currentpage == "SignUp") createuser(e);
              else signin(e);
            }}
          >
            <input
              type="text"
              className=" my-3 p-2 rounded-sm"
              placeholder="John@gmial.com"
              value={email}
              onChange={(e) => {
                setError(null);
                setEmail(e.target.value);
              }}
              required
            />
            <input
              type="password"
              className="my-3 p-2 rounded-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setError(null);
                setPassword(e.target.value);
              }}
              required
            />
            {error && (
              <span className="text-[#FF0000] cursor-pointer  w-fit">
                {error}
              </span>
            )}
            <span
              className=" text-[#0000EE] cursor-pointer border-b border-[#0000EE]  w-fit"
              onClick={() =>
                setCurrentpage((prev) => {
                  console.log(prev);
                  return prev == "Login" ? "SignUp" : "Login";
                })
              }
            >
              {currentpage == "Login" ? "SignUp" : "Login"}
            </span>
            <button
              type="submit"
              className="text-[white] text-xl my-3 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-5 py-2.5 mb-2 dark:bg-gray-800  hover:bg-white hover:text-black dark:focus:ring-gray-700 dark:border-gray-700 w-1/2 mx-auto border-2 border-white duration-500 ease-in-out"
            >
              {currentpage == "Login" ? "Login" : "SignUp"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
