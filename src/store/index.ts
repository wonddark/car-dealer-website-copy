import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import vehiclesSlice from "@/store/features/vehicles.slice";
import vehiclesApi from "@/store/api";
import filtersSlice from "@/store/features/filters.slice";

const store = configureStore({
  reducer: {
    [vehiclesSlice.reducerPath]: vehiclesSlice.reducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    [filtersSlice.reducerPath]: filtersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(vehiclesApi.middleware),
});

export default store;

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
