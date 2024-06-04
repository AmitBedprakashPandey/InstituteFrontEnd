import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/courses";

export const getCoursebyId = createAsyncThunk(
  "Course/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const createCourse = createAsyncThunk(
  "Course/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const updateCourse = createAsyncThunk(
  "Course/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const deleteCourse = createAsyncThunk(
  "Course/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);

const CourseSlice = createSlice({
  name: "Course",
  initialState: {
    course: [],
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
      .addCase(getCoursebyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoursebyId.fulfilled, (state, action) => {
        state.course = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCoursebyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.course.push(action.payload.data);

        state.message = action.payload?.message;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.course.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.course[index] = action.payload.data;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.course = state.course.filter(
          (enq) => enq._id !== action.payload.id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { getclear } = CourseSlice.actions;
export default CourseSlice.reducer;
