// all return a new array, for reducer use
export const addItemToCart = (cartItems, newCartItem) => {
  const existingCartItem = cartItems.find((item) => {
    return item.id === newCartItem.id;
  });

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === newCartItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    //if items do not have this item, add this item to array and attach quantity property
    return [...cartItems, { ...newCartItem, quantity: 1 }];
  }
};

export const removeItemToCart = (cartItems, newCartItem) => {
  return cartItems.map((item) =>
    item.id === newCartItem.id ? { ...item, quantity: item.quantity - 1 } : item
  );
};
