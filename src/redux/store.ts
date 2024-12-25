import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import vehiclesSlice from "@/redux/features/vehicles.slice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    [vehiclesSlice.reducerPath]: vehiclesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
