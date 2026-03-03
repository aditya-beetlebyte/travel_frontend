import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { hydrateCart } from "./features/cartSlice";
import productSlice from "./features/productSlice";
import wishlistSlice from "./features/wishlistSlice";
import authSlice, { hydrateAuth } from "./features/authSlice";

const store = configureStore({
   reducer: {
      products: productSlice,
      cart: cartSlice,
      wishlist: wishlistSlice,
      auth: authSlice,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

if (typeof window !== "undefined") {
   store.dispatch(hydrateCart());
   store.dispatch(hydrateAuth());
}
export type RootState = ReturnType<typeof store.getState>;

export default store;