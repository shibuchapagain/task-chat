import { createSlice } from '@reduxjs/toolkit';

const ProductsSlicer = createSlice({
  name: 'products',
  initialState: {
    productData: [],
    categoryData: [],
    subCategoryData: [],
  },
  reducers: {
    productStore: (state, action) => {
      state.productData = action.payload;
    },
    categoryStore: (state, action) => {
      state.categoryData = action.payload;
    },
    subCategoryStore: (state, action) => {
      state.subCategoryData = action.payload;
    },
  },
});

export const { productStore, categoryStore, subCategoryStore } =
  ProductsSlicer.actions;
export default ProductsSlicer.reducer;
