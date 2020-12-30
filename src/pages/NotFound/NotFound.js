import React from "react";
import { Link } from "react-router-dom";
import crying from "../../assets/images/crying.gif";
import "./not-found.style.scss";

const NotFound = () => {
  return (
    <div className="container">
      <h1>This page does not exist</h1>

      <div className="not-found">
        <span className="four">4</span>
        <img
          className="img-container"
          src={crying}
          alt="Jan Boutique not found"
        />
        <span className="four">4</span>
      </div>
      <Link className="link" to="/store">
        Continue Shopping
      </Link>
    </div>
  );
};

export default NotFound;
