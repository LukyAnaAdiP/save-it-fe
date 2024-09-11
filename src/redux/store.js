import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './features/user/userSlice';
import procurementReducer from './procurementSlice';
import storage from 'redux-persist/lib/storage';
import vendorReducer from './features/vendor/vendorSlice'
import customerWarehouseReducer from './features/customer/customerSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import categoryReducer from './categorySlice'
import customerListReducer from '../redux/features/vendor/customerListSlice';
// import customerReducer from './features/customer/customerSlice';

// Combine all reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  procurements: procurementReducer,
  vendor: vendorReducer,
  customerWarehouse: customerWarehouseReducer,
  category: categoryReducer,
  customer: customerListReducer
});

// Configure persistor
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export the store and persistor
export const persistor = persistStore(store);
export default store;
