import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

// initial state
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false
};

// create product action
export const createProductAction = createAsyncThunk('product/create',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name, description, category, sizes, brand, colors, price, totalQty, images } = payload;
      // make request
      // Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      };
      // form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('brand', brand);
      formData.append('price', price);
      formData.append('totalQty', totalQty);
      sizes.forEach((size) => { formData.append('sizes', size); });
      colors.forEach((color) => { formData.append('colors', color); });
      images.forEach((image) => { formData.append('images', image); });

      const { data } = await axios.post(`${baseURL}/products`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// fetch products action
export const fetchProductsAction = createAsyncThunk('product/list',
  async ({ url }, { rejectWithValue, getState, dispatch }) => {
    console.log(url);
    try {
      // make request
      // Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };

      const { data } = await axios.get(`${url}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// fetch product action
export const fetchProductAction = createAsyncThunk('product/details',
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      // make request
      // Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const { data } = await axios.get(`${baseURL}/products/${productId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// slice
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    // fetch all Products
    builder.addCase(fetchProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.products = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    // fetch One Product
    builder.addCase(fetchProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    // reset error
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
    });
    // reset success
    builder.addCase(resetSuccessAction.pending, (state) => {
      state.isAdded = false;
    });
  }
});

// generate the reducer
const productReducer = productSlice.reducer;

export default productReducer;
