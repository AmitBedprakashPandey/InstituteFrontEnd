import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/school";

export const getSchoolbyId = createAsyncThunk(
  "School/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);      
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const createSchool = createAsyncThunk(
  "School/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const updateSchool = createAsyncThunk(
  "School/update",
  async (data, { rejectWithValue }) => {
    try {
        
      const response = await axios.put(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const deleteSchool = createAsyncThunk(
  "School/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const SchoolStatus = createAsyncThunk(
  "School/status",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/status/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);

const SchoolSlice = createSlice({
  name: "School",
  initialState: {
    School: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSchoolbyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSchoolbyId.fulfilled, (state, action) => {        
        state.School = action.payload;        
        state.loading = false;
        state.error = null;
      })
      .addCase(getSchoolbyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.School.push(action.payload.data);
        state.message = action.payload?.message;
      })
      .addCase(createSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSchool.fulfilled, (state, action) => {
        console.log(action.payload);
        const index = state.School.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.School[index] = action.payload.data;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.School = state.School.filter(
          (enq) => enq._id !== action.payload.id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(SchoolStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(SchoolStatus.fulfilled, (state, action) => {
        const index = state.School.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.School[index].status = action.payload.data.status;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(SchoolStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default SchoolSlice.reducer;
