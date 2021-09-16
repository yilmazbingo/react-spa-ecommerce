export const addItemToCart = (cartItems, cartItemToAdd) => {
  //find(condition) finds the first item in the array based on the array.
  const existingCartItem = cartItems.find(
    (item) => item.id === cartItemToAdd.id
  );
  if (existingCartItem) {
    //in order for change detection to trigger we have to rerender
    //otherwise our quantity property will not be updated
    //map will return a new array
    //we need to return new versions of our state so that our component know to re render
    //here we update the quantity property
    return cartItems.map((item) =>
      item.id === cartItemToAdd.id
        ? { ...cartItemToAdd, quantity: item.quantity + 1 }
        : item
    );
  }
  //quantity property gets attached the first time around since this if block wont run when it is a new item.
  return [...cartItems, { ...cartItemToAdd, quantity: 1, inCart: true }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  //check if item in the cartItems
  const existingCartItem = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }

  return cartItems.map((item) =>
    item.id === cartItemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
  // return (existingCartItem.quantiy = existingCartItem.quantity - 1);
};
