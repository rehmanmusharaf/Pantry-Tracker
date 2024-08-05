"use client";
import Image from "next/image";
import ProductCard from "./components/ProductCard";
import { app } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../context/User";
const db = getDatabase(app);
const auth = getAuth();
export default function Home() {
  const [user, setUser] = useAuth();
  function put() {
    // set(ref(db, "users/mrehman"), {
    //   id: 1,
    //   name: "Muhammad REhman",
    //   age: 21,
    // });
  }
  useEffect(() => {
    console.log("user is:", user);
  }, [user]);
  return (
    <main>
      <div className="h-11"></div>
      <div className="flex justify-center items-center h-screen w-full bg-black">
        {/* {user && user ? (
          <h1 className="text-white">Hello User loggedin</h1>
        ) : (
          <h1>Hello User Logged out</h1>
        )} */}
        <h1 className="font-bold text-5xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Pantry Tracker App
        </h1>
        {/* <button onClick={put}>click me</button> */}
        {/* <ProductCard /> */}
      </div>
    </main>
  );
}
