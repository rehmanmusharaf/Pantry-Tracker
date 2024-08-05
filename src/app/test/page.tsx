"use client";
import React from "react";
import { app } from "../../firebase";
// import firebase from "firebase/compat/app";
// import { set } from "firebase/database";
import { getDatabase, ref, set } from "firebase/database";
const database = getDatabase(app);
const Test = () => {
  async function putdata() {
    console.log("putdata function run!");
    const result = await set(ref(database, "grandfather/father"), {
      name: "Muhammad Rehman",
      id: 1,
    });
    console.log("result is: ", result);
  }
  return (
    <>
      <div>
        <div className="h-11"></div>
        test
      </div>
      <button onClick={() => putdata()}>Click me Tio put real time data</button>
    </>
  );
};

export default Test;
