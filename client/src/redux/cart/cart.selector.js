import { createSelector } from 'reselect';

//input selector, grab piece of state from root state (store)
const selectCart = (state) => state.cart;

//output selector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

//above 'selectCartItems' is a bridge
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, item) => accumulatedQuantity + item.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedPrice, item) => accumulatedPrice + item.price * item.quantity,
    0
  )
);
