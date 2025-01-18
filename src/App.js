import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AuthForm from "./components/AuthForm"; // Combined Signup and Login
import ChatRoom from "./components/ChatRoom";
import Header from "./components/Header"; // Import the Header component

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div>
      <Header /> {/* Add the header */}
      {user ? (
        <div>
          <button onClick={handleLogout} style={{ marginBottom: "10px" }}>
            Logout
          </button>
          <ChatRoom />
        </div>
      ) : (
        <AuthForm />
      )}
    </div>
  );
};

export default App;


