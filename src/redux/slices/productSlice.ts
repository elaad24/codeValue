import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productInterface } from "../../components/ItemsSection";

interface ProductsState {
  products: productInterface[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<productInterface[]>) => {
      state.products = action.payload;
    },
    updateProducts: (state, action: PayloadAction<productInterface[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<productInterface>) => {
      state.products.push(action.payload);
    },
    removeProductById: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.ID !== action.payload
      );
    },
    editProduct: (state, action: PayloadAction<productInterface>) => {
      const index = state.products.findIndex(
        (product) => product.ID === action.payload.ID
      );
      state.products[index] = action.payload;
    },
  },
});

export const {
  init,
  updateProducts,
  addProduct,
  removeProductById,
  editProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
