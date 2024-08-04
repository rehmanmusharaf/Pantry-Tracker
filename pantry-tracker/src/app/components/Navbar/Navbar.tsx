"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/User";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../../firebase";

const auth = getAuth(app);
const navbar = () => {
  const [user, setUser] = useAuth();
  // console.log("user is in navbar", user);
  useEffect(() => {}, [user]);
  return (
    <>
      <div className="fixed text-white min-h-10 h-auto w-full flex bg-black">
        <div className="w-1/2 p-1">
          <Link href="/" className="flex items-center">
            <svg
              className="w-10 h-10 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z"
              />
            </svg>
            <span className="text-xl font-bold">Pantry Tracker</span>
          </Link>
        </div>
        <div className=" w-1/2 p-1 flex items-center justify-end">
          <ul className="flex h-full items-center">
            <Link
              href="/todo"
              className="mx-1 cursor-pointer hover:font-bold hover:text-xl duration-100 text-lg w-16"
            >
              ToDo
            </Link>
            {user ? (
              <svg
                className="w-8 h-8 text-white dark:text-white mr-2 cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <Link href="/login">
                <li className="mx-1 cursor-pointer hover:font-bold hover:text-xl duration-100 text-lg w-16">
                  Login
                </li>
              </Link>
            )}
            {user && (
              <li
                className="mr-1 cursor-pointer hover:font-bold hover:text-xl hover:text-[#FF0000] duration-100 text-lg w-16"
                onClick={() => {
                  signOut(auth);
                  setUser(null);
                }}
              >
                LogOut
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default navbar;
