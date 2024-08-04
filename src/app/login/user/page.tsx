import React from "react";
interface User {
  id: number;
  name: String;
}
const user = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();
  return (
    <ul>
      {users.map((val, index) => {
        return <li key={index}>{val.name}</li>;
      })}
    </ul>
  );
};

export default user;
