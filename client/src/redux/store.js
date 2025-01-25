import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './userSlice';
import restaurantReducer from './restaurantSlice';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';



const userPersistConfig = {
  key: "user",
  storage,
};

const restaurantPersistConfig = {
  key: "restaurant",
  storage,
};
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedRestaurantReducer = persistReducer(restaurantPersistConfig,restaurantReducer);
const store = configureStore({
  reducer: {
    user: persistedUserReducer, 
    restaurant : persistedRestaurantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }, // Required for redux-persist
    }),
});


export const persistor = persistStore(store);
export default store;

