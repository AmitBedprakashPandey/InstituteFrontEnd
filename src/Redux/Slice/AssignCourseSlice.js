import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/enrollments";

export const getAssignCoursebyId = createAsyncThunk(
  "AssignCourse/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const createAssignCourse = createAsyncThunk(
  "AssignCourse/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const updateAssignCourse = createAsyncThunk(
  "AssignCourse/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const deleteAssignCourse = createAsyncThunk(
  "AssignCourse/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
const AssignCourseSlice = createSlice({
  name: "AssignCourse",
  initialState: {
    AssignCourse: [],
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
      .addCase(getAssignCoursebyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssignCoursebyId.fulfilled, (state, action) => {
        state.AssignCourse = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAssignCoursebyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAssignCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssignCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.AssignCourse.push(action.payload.data);

        state.message = action.payload?.message;
      })
      .addCase(createAssignCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAssignCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAssignCourse.fulfilled, (state, action) => {
        const index = state.AssignCourse.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.AssignCourse[index] = action.payload.data;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateAssignCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAssignCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAssignCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.AssignCourse = state.AssignCourse.filter(
          (enq) => enq._id !== action.payload.data
        );
        state.message = action.payload.message;
      })
      .addCase(deleteAssignCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { getclear } = AssignCourseSlice.actions;
export default AssignCourseSlice.reducer;
