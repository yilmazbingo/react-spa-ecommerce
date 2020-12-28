import React, { useState, useCallback } from "react";
import CustomButton from "../custom-button/custom-botton.component";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { createStructuredSelector } from "reselect";
import { addItem } from "../../redux/cart/cart.actions";
import AddToCardForMobile from "../mobile-button/mobile-button";

import "./collection-item.style.scss";

const CollectionItem = ({ item, addItem, title, index }) => {
  const { name, price, imageUrl, inCart } = item;
  const [addedToCart, setAddedToCard] = useState(false);

  const handleAddItem = () => {
    addItem(item);
    setAddedToCard(true);
  };

  const addToCart = useCallback(() => handleAddItem(), [addedToCart]);

  return (
    <React.Fragment>
      <div className="collection-item">
        {/* <div
      className="image"
      style={{ backgroundImage: `url(${imageUrl})` }}
   ></div>8*/}
        <div className="card-body ">
          <div className="card-img-container">
            <Link to={`/shop/${title}/${name}`}>
              <img src={imageUrl} alt={name} className="card-img" />
            </Link>
            <button
              className="cart-btn"
              onClick={addToCart}
              disabled={inCart ? true : false}
            >
              {addedToCart ? (
                <p disabled>In Cart</p>
              ) : (
                <TiShoppingCart className="icon" />
              )}
            </button>
          </div>
        </div>

        <div className="card-footer">
          <span className="name">{name}</span>
          <span>
            <div className="price-and-dollar">
              <span className="dollar-sign">$</span>
              <span className="price"> {price}</span>
            </div>
          </span>
        </div>
        {/*<CustomButton onClick={() => addItem(item)} inverted>
      Add to Cart
      </CustomButton>*/}
        {/* this will add the item to the state.cartItems */}
        <AddToCardForMobile item={item} />
      </div>
    </React.Fragment>
  );
};
//we are changing button css based on prop that we pass onto the component

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
