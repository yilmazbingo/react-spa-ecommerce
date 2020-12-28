import { createSelector } from "reselect";
//there are two types of selectors.
//1st: input selector that does not use createSelector
//2nd type is output selector that use input selector and createSelector to build themselves.

//this function gets the whole state and just returns a slice of it. one layer deep usually.
const selectCart = (state) => state.cart;

//next selector is going to use createSelector. first argument is input selector
//second argument is func that returns value we want out of the selector.params of this func is each output of the input selectors in order that those selectors were written. if we had another selector, output of that would be the second argument of the function.
//it checks if state.cart changed
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

//we use createSelector to make selectCartItems selector, it is now a memoir selector.
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);

//this will make sure that  our card dropdown component is not getting rerendered whenever the state changes that is unrelated to the carditems.
//state is a big object, so we are memoizing
