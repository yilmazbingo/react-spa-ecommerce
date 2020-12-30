import React from "react";
import CustomButton from "../custom-button/custom-botton.component";
import { connect } from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

//connect provides dispatch. no need to use mapDispatchToProps
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <span className="empty-message"> Your cart is empty </span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

//its argument is state. state.cart.cartItems
// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   cartItems
// });

//our component will no rerendered whenever the state changes that unrelated to the cart items.
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

//withRouter passes mathc, history, location objects
export default withRouter(connect(mapStateToProps)(CartDropdown));
