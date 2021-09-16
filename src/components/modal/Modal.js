import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { closeModal } from "../../redux/modal/modal.actions";
import Button from "../custom-button/custom-botton.component";
import "./modal.style.scss";

const Modal = (props) => {
  const { imageUrl, price, title, closeModal } = props;
  return (
    <div className="modal-container">
      <div className="modal">
        <h4>item added to cart</h4>
        <div className="modal-image">
          <img src={imageUrl} className="item-image" alt={`${title}`} />
        </div>
        <h5>{title}</h5>
        <h3 className="modal-price">price : ${price}</h3>
        <Link to="/store">
          <Button
            detailsPage
            onClick={() => {
              closeModal();
            }}
          >
            Continue Shopping
          </Button>
        </Link>
        <Link to="/checkout">
          <Button
            detailsPage
            inCart
            onClick={() => {
              closeModal();
            }}
          >
            Go To Cart
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default connect(null, { closeModal })(Modal);
