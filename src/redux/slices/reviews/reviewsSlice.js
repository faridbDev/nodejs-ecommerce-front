import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

// initial state
const initialState = {
  reviews: [],
  review: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false
};

// create review action
export const createReviewAction = createAsyncThunk('review/create',
  async ({ rating, message, id }, { rejectWithValue, getState, dispatch }) => {
    try {
      // Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      // make request
      const { data } = await axios.post(`${baseURL}/reviews/${id}`, { rating, message }, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// slice
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createReviewAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReviewAction.fulfilled, (state, action) => {
      state.loading = false;
      state.review = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createReviewAction.rejected, (state, action) => {
      state.loading = false;
      state.review = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    // reset err action
    builder.addCase(resetErrAction.pending, (state) => {
      state.isAdded = false;
      state.error = null;
    });
    // reset success action
    builder.addCase(resetSuccessAction.pending, (state) => {
      state.isAdded = false;
      state.error = null;
    });
  }
});

// generate the reducer
const reviewReducer = reviewsSlice.reducer;

export default reviewReducer;
