import React from "react";
import { Link } from "react-router-dom";

function PaymentSuccessful() {
  console.log("successful payment");
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>
        Successfully Done Payment:
        <Link to="/"> Return to Home Page</Link>
      </h1>
    </div>
  );
}

export default PaymentSuccessful;
