import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages from Firestore
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let messagesArray = [];
      snapshot.forEach((doc) => {
        messagesArray.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesArray);
    });
    return () => unsubscribe();
  }, []);

  // Add a new message to Firestore
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: new Date(),
      uid,
      displayName,
    });
    setNewMessage("");
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.displayName}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
