import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction } from "../globalActions/globalActions";

// intitial state
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: null,
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null 
  }
};

// login action
export const loginUserAction = createAsyncThunk("users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      // make http request
      const { data } = await axios.post(`${baseURL}/users/login`, { email, password });
      // save the user into localstorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// register action
export const registerUserAction = createAsyncThunk("users/regsiter",
  async ({ email, password, fullname }, { rejectWithValue, getState, dispatch }) => {
    try {
      // make http request
      const { data } = await axios.post(`${baseURL}/users/register`, { email, password, fullname });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// user profile action
export const getUserProfileAction = createAsyncThunk("users/profile-fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// update user shipping address action
export const updateUserShippingAddressAction = createAsyncThunk("users/update-shipping-address",
  async ({ firstName, lastName, address, city, country, postalCode, province, phone }, { rejectWithValue, getState, dispatch }) => {
    try {
      // get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await axios.put(`${baseURL}/users/update/shipping`,
        { firstName, lastName, address, city, country, province, postalCode, phone }, config);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// logout action
export const logOutUserAction = createAsyncThunk("users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    localStorage.removeItem('userInfo');
    return true;
  }
);

// users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // handle actions
    // login
    builder.addCase(loginUserAction.pending, (state) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });
    // register
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    // user profile
    builder.addCase(getUserProfileAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    // update shipping address
    builder.addCase(updateUserShippingAddressAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserShippingAddressAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUserShippingAddressAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    // logout user
    builder.addCase(logOutUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = null;
    });
    // reset error action
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
    });
  }
});

// generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;