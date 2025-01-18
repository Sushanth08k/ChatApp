import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between Signup and Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsSignup((prev) => !prev); // Toggle between Signup and Login
    setError(""); // Clear errors when switching
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        // Handle Signup
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful! You can now log in.");
      } else {
        // Handle Login
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
    } catch (err) {
      setError(err.message); // Display error messages
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Google login successful!");
    } catch (err) {
      setError(err.message); // Display error messages
    }
  };

  return (
    <div>
      <h1>{isSignup ? "Sign Up" : "Log In"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
      </form>
      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={toggleForm}
          style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
        >
          {isSignup ? "Log In" : "Sign Up"}
        </button>
      </p>
      <hr />
      <button onClick={handleGoogleLogin} style={{ background: "#4285F4", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Sign in with Google
      </button>
    </div>
  );
};

export default AuthForm;

