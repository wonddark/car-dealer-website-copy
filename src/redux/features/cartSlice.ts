import { toast } from "react-toastify";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localstorage";
import { Vehicle } from "@/types/vehicle";

interface CartState {
  cart: { vehicle: Vehicle; quantity: number }[];
  orderQuantity: number;
}

const initialState: CartState = {
  cart: [],
  orderQuantity: 1,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<Vehicle>) => {
      const productIndex = state.cart.findIndex(
        (item) => item.vehicle.vin === payload.vin,
      );
      if (productIndex >= 0) {
        state.cart[productIndex].quantity += 1;
        toast.info(`${payload.titleCode} Increase Product Quantity`, {
          position: "top-right",
        });
      } else {
        const tempProduct = { vehicle: payload, quantity: 1 };
        state.cart.push(tempProduct);
        toast.success(`${payload.titleCode} added to cart`, {
          position: "top-right",
        });
      }
      setLocalStorage("cart", state.cart);
    },
    //
    increment: (state) => {
      state.orderQuantity = state.orderQuantity + 1;
    },
    decrement: (state) => {
      state.orderQuantity =
        state.orderQuantity > 1 ? state.orderQuantity - 1 : 1;
    },
    //

    decrease_quantity: (state, { payload }: PayloadAction<Vehicle>) => {
      const cartIndex = state.cart.findIndex(
        (item) => item.vehicle.vin === payload.vin,
      );
      if (state.cart[cartIndex].quantity > 1) {
        state.cart[cartIndex].quantity -= 1;
        toast.error(`${payload.titleCode} Decrease cart quantity`, {
          position: "top-right",
        });
      }
      setLocalStorage("cart", state.cart);
    },
    remove_cart_product: (state, { payload }: PayloadAction<Vehicle>) => {
      state.cart = state.cart.filter(
        (item) => item.vehicle.vin !== payload.vin,
      );
      toast.error(`Remove from your cart`, {
        position: "top-right",
      });
      setLocalStorage("cart", state.cart);
    },
    clear_cart: (state) => {
      const confirmMsg = window.confirm(
        "Are you sure you want to delete your bag?",
      );
      if (confirmMsg) {
        state.cart = [];
      }
      setLocalStorage("cart", state.cart);
    },
    get_cart_products: (state) => {
      state.cart = getLocalStorage<{ vehicle: Vehicle; quantity: number }>(
        "cart",
      );
    },
    quantityDecrement: (state, { payload }: PayloadAction<Vehicle>) => {
      state.cart = state.cart.map((item) => {
        if (item.vehicle.vin === payload.vin && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setLocalStorage("cart", state.cart);
    },
  },
});

export const {
  addToCart,
  decrease_quantity,
  remove_cart_product,
  clear_cart,
  get_cart_products,
  quantityDecrement,
  increment,
  decrement,
} = cartSlice.actions;

export default cartSlice.reducer;
