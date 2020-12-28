import React, { useState, useCallback } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

import "./mobile-button.scss";

const AddToCardForMobile = ({ addItem, item }) => {
  const [addedToCart, setAddedToCard] = useState(false);

  const handleAddItem = () => {
    addItem(item);
    setAddedToCard(true);
  };

  const addToCart = useCallback(() => handleAddItem(), [addedToCart]);
  return (
    <div className="mobile-button" type="button" onClick={addToCart}>
      <TiShoppingCart className="cart-icon" />
      <span className="add-to-cart">
        {addedToCart ? "In Cart" : "Add To Cart"}
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(AddToCardForMobile);
