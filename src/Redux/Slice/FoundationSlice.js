import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/foundation";

export const getfoundationAll = createAsyncThunk(
  "foundation/all",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const getfoundationbyId = createAsyncThunk(
  "foundation/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const createfoundation = createAsyncThunk(
  "foundation/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const updatefoundation = createAsyncThunk(
  "foundation/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const deletefoundation = createAsyncThunk(
  "foundation/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const foundationStatus = createAsyncThunk(
  "foundation/status",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
const FoundationSlice = createSlice({
  name: "foundation",
  initialState: {
    foundation: [],
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
      .addCase(getfoundationAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getfoundationAll.fulfilled, (state, action) => {
        state.foundation = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getfoundationAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getfoundationbyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getfoundationbyId.fulfilled, (state, action) => {
        state.foundation = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getfoundationbyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createfoundation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createfoundation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.foundation.push(action.payload.data);
        state.message = action.payload?.message;
      })
      .addCase(createfoundation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatefoundation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatefoundation.fulfilled, (state, action) => {
        const index = state.foundation.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.foundation[index] = action.payload.data;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updatefoundation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletefoundation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletefoundation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.foundation = state.foundation.filter(
          (enq) => enq._id !== action.payload.id
        );
        state.message = action.payload.message;
      })
      .addCase(deletefoundation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(foundationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(foundationStatus.fulfilled, (state, action) => {
        const index = state.foundation.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.foundation[index].status = action.payload.data.status;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(foundationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { getclear } = FoundationSlice.actions;
export default FoundationSlice.reducer;
