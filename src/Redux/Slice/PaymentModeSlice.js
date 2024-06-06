

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/paymentmode";

export const getPaymentModeAll = createAsyncThunk(
  "PaymentMode/All",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const createPaymentMode = createAsyncThunk(
  "PaymentMode/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const updatePaymentMode = createAsyncThunk(
  "PaymentMode/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const deletePaymentMode = createAsyncThunk(
  "PaymentMode/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);

const PaymentModeSlice = createSlice({
  name: "PaymentMode",
  initialState: {
    PaymentMode: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getclear: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentModeAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentModeAll.fulfilled, (state, action) => {
        state.PaymentMode = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getPaymentModeAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPaymentMode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentMode.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.PaymentMode.push(action.payload.data);

        state.message = action.payload?.message;
      })
      .addCase(createPaymentMode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePaymentMode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentMode.fulfilled, (state, action) => {
        const index = state.PaymentMode.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.PaymentMode[index] = action.payload.data;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updatePaymentMode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePaymentMode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePaymentMode.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.PaymentMode = state.PaymentMode.filter(
          (enq) => enq._id !== action.payload.id
        );
        state.message = action.payload.message;
      })
      .addCase(deletePaymentMode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { getclear } = PaymentModeSlice.actions;
export default PaymentModeSlice.reducer;
