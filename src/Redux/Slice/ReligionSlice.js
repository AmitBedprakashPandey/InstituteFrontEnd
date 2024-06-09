import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/religion";

export const getReligionAll = createAsyncThunk(
  "Religion/all",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const getReligionbyId = createAsyncThunk(
  "Religion/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const createReligion = createAsyncThunk(
  "Religion/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const updateReligion = createAsyncThunk(
  "Religion/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const deleteReligion = createAsyncThunk(
  "Religion/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const ReligionStatus = createAsyncThunk(
  "Religion/status",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);

const ReligionSlice = createSlice({
  name: "Religion",
  initialState: {
    Religion: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReligionAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReligionAll.fulfilled, (state, action) => {
        state.Religion = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getReligionAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getReligionbyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReligionbyId.fulfilled, (state, action) => {
        state.Religion = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getReligionbyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReligion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReligion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.Religion.push(action.payload.data);
        state.message = action.payload?.message;
      })
      .addCase(createReligion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateReligion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReligion.fulfilled, (state, action) => {
        const index = state.Religion.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.Religion[index] = action.payload.data;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateReligion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteReligion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReligion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.Religion = state.Religion.filter(
          (enq) => enq._id !== action.payload.id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteReligion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(ReligionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(ReligionStatus.fulfilled, (state, action) => {
        const index = state.Religion.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.Religion[index].status = action.payload.data.status;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(ReligionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default ReligionSlice.reducer;
