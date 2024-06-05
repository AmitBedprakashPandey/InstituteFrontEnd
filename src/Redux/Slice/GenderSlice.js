import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/Gender";

export const getGenderbyId = createAsyncThunk(
  "Gender/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const createGender = createAsyncThunk(
  "Gender/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const updateGender = createAsyncThunk(
  "Gender/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const deleteGender = createAsyncThunk(
  "Gender/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const GenderStatus = createAsyncThunk(
  "Gender/status",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
const GenderSlice = createSlice({
  name: "Gender",
  initialState: {
    Gender: [],
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
      .addCase(getGenderbyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGenderbyId.fulfilled, (state, action) => {
        state.Gender = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getGenderbyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGender.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGender.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.Gender.push(action.payload.data);
        state.message = action.payload?.message;
      })
      .addCase(createGender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateGender.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGender.fulfilled, (state, action) => {
        const index = state.Gender.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.Gender[index] = action.payload.data;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateGender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteGender.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGender.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.Gender = state.Gender.filter(
          (enq) => enq._id !== action.payload.id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteGender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GenderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GenderStatus.fulfilled, (state, action) => {
        const index = state.Gender.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.Gender[index].status = action.payload.data.status;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(GenderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { getclear } = GenderSlice.actions;
export default GenderSlice.reducer;
