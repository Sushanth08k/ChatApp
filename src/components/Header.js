import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Chat App</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    textAlign: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  title: {
    margin: 0,
    fontSize: "24px",
  },
};

export default Header;
