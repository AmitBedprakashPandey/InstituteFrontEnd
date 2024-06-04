import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/enquiry";

export const getEnquirybyId = createAsyncThunk(
  "Enquiry/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const createEnquiry = createAsyncThunk(
  "Enquiry/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const updateEnquiry = createAsyncThunk(
  "Enquiry/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "Enquiry/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
const EnquirySlice = createSlice({
  name: "Enquiry",
  initialState: {
    enquiry: [],
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
      .addCase(getEnquirybyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnquirybyId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.enquiry = [action.payload];
      })
      .addCase(getEnquirybyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.enquiry.push(action.payload.data);
        state.message = action.payload?.message;
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.error = null;
        const index = state.enquiry.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.enquiry[index] = action.payload.data;
        }
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.enquiry = state.enquiry.filter(
          (enq) => enq._id !== action.payload
        );
        state.message = action.payload.message;
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { getclear } = EnquirySlice.actions;
export default EnquirySlice.reducer;
