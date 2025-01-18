import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, query, onSnapshot, where } from "firebase/firestore";

const ChatRequest = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "!=", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let usersArray = [];
      snapshot.forEach((doc) => {
        usersArray.push(doc.data());
      });
      setUsers(usersArray);
    });
    return () => unsubscribe();
  }, []);

  const sendRequest = async (user) => {
    try {
      await addDoc(collection(db, "requests"), {
        from: auth.currentUser.uid,
        to: user.uid,
        status: "pending",
      });
      console.log("Request sent!");
    } catch (error) {
      console.error("Error sending request:", error.message);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <div>
        {users.map((user) => (
          <div key={user.uid}>
            <span>{user.displayName}</span>
            <button onClick={() => sendRequest(user)}>Send Request</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRequest;
