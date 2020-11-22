import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //local storage

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

//define a new persist config.
const persistConfig = {
  //meaning at what point inside of our reducer object do we want to start storing everything
  // and we want to start from the root then we want to pass storage in as storage.
  key: 'root',
  storage,
  // an array containing the string names of any of the reducer that we want to store/persist.
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  //The key is that represent the individual slices of state i.e. the actual reducer
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
