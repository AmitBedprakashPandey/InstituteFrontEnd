import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + `/auth`;
// const url=''
export const userlogin = createAsyncThunk(
  "User/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/login`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getUser = createAsyncThunk(
  "User/find",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/find/${localStorage.getItem("email")}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const AdmissionSlice = createSlice({
  name: "Admission",
  initialState: {
    user: [],
    userid: localStorage.getItem("userid"),
    loading: false,
    error: null,
    token: null,
  },
  reducers: {
    logout: () => {
      localStorage.removeItem("email");
      localStorage.removeItem("userToken");
      localStorage.removeItem("expired");
      localStorage.removeItem("userid");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userlogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userlogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        localStorage.setItem("email", action.payload.email);
        localStorage.setItem("userToken", action.payload.userToken);
        localStorage.setItem("expired", action.payload.expired);
      })
      .addCase(userlogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        localStorage.setItem("userid", action.payload.data.id);
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = AdmissionSlice.actions;
export default AdmissionSlice.reducer;
