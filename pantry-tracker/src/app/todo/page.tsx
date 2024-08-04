"use client";

import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  where,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../firebase";
import "./todo.css";
import { query } from "firebase/database";
import { useAuth } from "../../context/User";
const firestore = getFirestore(app);
const ToDo = () => {
  const [user] = useAuth();
  const [email, setEmail] = useState("");
  const [todo, setToDo] = useState("");
  const [error, setError] = useState<String | null>(null);
  const [todos, setTodos] = useState([]);
  async function addTodo(e: any) {
    e.preventDefault();
    if (user) {
      const result = await addDoc(collection(firestore, "todo"), {
        email: user.email,
        todo: todo,
        createdat: new Date(),
        iscomplete: false,
      });
      getTodo();
      console.log("result is:", result);
    } else {
      console.log("PLease Login to Countinue");
    }
  }
  async function getTodo() {
    if (user) {
      const collectionref = collection(firestore, "todo");
      const q = query(collectionref, where("email", "==", "jhon@gmail.com"));
      const result = await getDocs(q);
      console.log("QuerySnapshot:", result);

      if (!result.empty) {
        setTodos((prev) => {
          return [...result.docs];
        });
        result.docs.forEach((doc) => {
          console.log("Document ID:", doc.id);
          console.log("Document Data:", doc.data());
        });
      } else {
        console.log("No matching documents.");
      }
      // console.log("rsult is", result);
    } else {
      console.log("PLease Login to Countinue");
    }
  }
  async function updatedocument(id: string, status: boolean) {
    if (user) {
      const docref = doc(firestore, "todo", id);
      const result = await updateDoc(docref, {
        iscomplete: status,
      });
      console.log("result is");
      getTodo();
    } else {
      console.log("Please Login To Countinue");
    }
  }

  async function deleteDocument(id: string) {
    if (user) {
      const docRef = doc(firestore, "todo", id);
      try {
        await deleteDoc(docRef);
        console.log("Document deleted successfully");

        // Remove the deleted document from the state
        setTodos((prev) => prev.filter((doc) => doc?.id !== id));
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    } else {
      console.log("Please login to continue");
    }
  }
  useEffect(() => {
    getTodo();
  }, [user]);
  return (
    <>
      <main>
        <div className="h-11"></div>
        <div className="login-ccontainer flex items-center flex-col min-h-80 ">
          <h1 className=" text-white font-bold text-2xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            {" "}
            Your Pantry Tracker
          </h1>

          <form className="flex flex-col xl-w-1/3 md:w-1/2 sm:w-11/12">
            <div className="flex items-center">
              <input
                type="text"
                className="my-3 p-2 rounded-sm w-10/12"
                placeholder="ToDo"
                value={todo}
                onChange={(e) => {
                  setError(null);
                  setToDo(e.target.value);
                }}
                required
              />
              <button
                type="submit"
                onClick={(e) => addTodo(e)}
                className="text-[white]  ml-1 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 text-sm dark:bg-gray-800  hover:bg-white hover:text-black w-1/6 border-2 border-white duration-500 ease-in-out h-10"
              >
                Add
              </button>
            </div>
            {error && (
              <span className="text-[#FF0000] cursor-pointer  w-fit">
                {error}
              </span>
            )}
          </form>
          <div className="flex flex-col xl-w-1/3 md:w-1/2 sm:w-11/12 overflow-y-scroll h-screen border border-2">
            <ul id="todo-list">
              {todos &&
                todos.map((value: any, index: number) => {
                  return (
                    <li className="border-b border-gray-200 flex items-center justify-between py-4">
                      {/* <!-- Tasks will be added here dynamically --> */}
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={value?.data().iscomplete}
                          onClick={() => {
                            updatedocument(value.id, !value.data().iscomplete);
                          }}
                        />
                        <span className="text-white">{value.data().todo}</span>
                      </label>
                      <div>
                        <button
                          className="text-red-500 hover:text-red-700
                  mr-2 delete-btn"
                          onClick={() => deleteDocument(value.id)}
                        >
                          Delete
                        </button>
                        {/* <button
                          className="text-blue-500
                    hover:text-blue-700 edit-btn"
                        >
                          Edit
                        </button> */}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default ToDo;
