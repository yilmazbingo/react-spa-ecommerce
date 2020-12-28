import React from "react";
import crying from "../../../assets/images/crying.gif";
import "./database-error.style.scss";

const DatabaseError = () => {
  return (
    <div className="database-error">
      <div className="error-message">
        <span className="connection">C</span>{" "}
        <img className="img-crying" src={crying} alt="firebase failed" />
        <span className="connection">NNECTI</span>
        <img className="img-crying" src={crying} alt="firebase failed" />
        <span className="connection">N FAILED</span>
      </div>
    </div>
  );
};

export default DatabaseError;
