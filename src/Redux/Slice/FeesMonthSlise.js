import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/feesmonth";

export const getFeesMonthbyId = createAsyncThunk(
  "FeesMonth/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${url}/${localStorage.getItem("userid")}/${id}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const createFeesMonth = createAsyncThunk(
  "FeesMonth/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const updateFeesMonth = createAsyncThunk(
  "FeesMonth/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);

const FeesMonthSlice = createSlice({
  name: "FeesMonth",
  initialState: {
    FeesMonth: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    eraseMessError: (state) => {
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeesMonthbyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeesMonthbyId.fulfilled, (state, action) => {
        state.FeesMonth = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getFeesMonthbyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createFeesMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createFeesMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.FeesMonth.push(action.payload.data);
        state.message = action.payload?.message;
      })
      .addCase(createFeesMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFeesMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFeesMonth.fulfilled, (state, action) => {
        state.FeesMonth = action.payload.data;
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateFeesMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { eraseMessError } = FeesMonthSlice.actions;
export default FeesMonthSlice.reducer;
