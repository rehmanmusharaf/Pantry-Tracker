"use client";
import { useState, createContext, useContext, useEffect } from "react";
// import ReactDOM from "react-dom/client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
const auth = getAuth(app);
const UserContext: any = createContext();
function User({ children }: any) {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user);
      } else {
        console.log("user ogged out");
        setUser(null);
      }
    });
  });
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
export default User;
let useAuth = () => useContext(UserContext);

export { useAuth };
