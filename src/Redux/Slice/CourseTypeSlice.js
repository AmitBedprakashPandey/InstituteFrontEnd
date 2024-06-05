import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/coursetype";

export const getCourseTypebyId = createAsyncThunk(
  "CourseType/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const createCourseType = createAsyncThunk(
  "CourseType/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const updateCourseType = createAsyncThunk(
  "CourseType/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const deleteCourseType = createAsyncThunk(
  "CourseType/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const CourseTypeStatus = createAsyncThunk(
  "CourseType/status",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
const CourseTypeSlice = createSlice({
  name: "CourseType",
  initialState: {
    CourseType: [],
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
      .addCase(getCourseTypebyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourseTypebyId.fulfilled, (state, action) => {
        state.CourseType = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCourseTypebyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCourseType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourseType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.CourseType.push(action.payload.data);
        state.message = action.payload?.message;
      })
      .addCase(createCourseType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCourseType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourseType.fulfilled, (state, action) => {
        const index = state.CourseType.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.CourseType[index] = action.payload.data;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateCourseType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCourseType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourseType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.CourseType = state.CourseType.filter(
          (enq) => enq._id !== action.payload.id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteCourseType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CourseTypeStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(CourseTypeStatus.fulfilled, (state, action) => {
        const index = state.CourseType.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.CourseType[index].status = action.payload.data.status;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(CourseTypeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { getclear } = CourseTypeSlice.actions;
export default CourseTypeSlice.reducer;
