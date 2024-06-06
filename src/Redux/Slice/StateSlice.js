import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/state";

export const getStateAll = createAsyncThunk(
  "State/all",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const getStatebyId = createAsyncThunk(
  "State/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const createState = createAsyncThunk(
  "State/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const updateState = createAsyncThunk(
  "State/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const deleteState = createAsyncThunk(
  "State/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const StateStatus = createAsyncThunk(
  "State/status",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
const StateSlice = createSlice({
  name: "State",
  initialState: {
    State: [],
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
      .addCase(getStateAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStateAll.fulfilled, (state, action) => {
        state.State = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getStateAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getStatebyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatebyId.fulfilled, (state, action) => {
        state.State = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getStatebyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createState.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.State.push(action.payload.data);
        state.message = action.payload?.message;
      })
      .addCase(createState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateState.fulfilled, (state, action) => {
        const index = state.State.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.State[index] = action.payload.data;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteState.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.State = state.State.filter(
          (enq) => enq._id !== action.payload.id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(StateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(StateStatus.fulfilled, (state, action) => {
        const index = state.State.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.State[index].status = action.payload.data.status;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(StateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { getclear } = StateSlice.actions;
export default StateSlice.reducer;
