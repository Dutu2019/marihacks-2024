import React from "react";
import { Link } from "react-router-dom";
import NavbarEl from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export default function Navbar() {
  return (
    <NavbarEl
      style={{
        position: "relative",
        backgroundColor: "#940bb3",
        paddingBottom: "30vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <NavbarEl.Brand
        style={{
          position: "absolute",
          top: "50%",
          fontFamily: "Poppins",
          fontSize: "3rem",
          transform: "translateY(-50%)",
        }}
      >
        RehabTech
      </NavbarEl.Brand>
      <Button
        variant="dark"
        size="lg"
        style={{
          position: "absolute",
          top: "75%",
          transform: "transition(-50%)",
          width: "90%",
        }}
      >
        <Link to="/rehab">Start rehabilitating</Link>
      </Button>
    </NavbarEl>
  );
}
