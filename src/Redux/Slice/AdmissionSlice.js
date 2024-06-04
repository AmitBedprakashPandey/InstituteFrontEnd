import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/students";

export const getAdmissionbyId = createAsyncThunk(
  "Admission/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const createAdmission = createAsyncThunk(
  "Admission/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const updateAdmission = createAsyncThunk(
  "Admission/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const deleteAdmission = createAsyncThunk(
  "Admission/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const admissionStatus = createAsyncThunk(
  "Admission/status",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
const AdmissionSlice = createSlice({
  name: "Admission",
  initialState: {
    admission: [],
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
      .addCase(getAdmissionbyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdmissionbyId.fulfilled, (state, action) => {
        state.admission = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAdmissionbyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAdmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdmission.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.admission.push(action.payload.data);
        state.message = action.payload?.message;
      })
      .addCase(createAdmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAdmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmission.fulfilled, (state, action) => {
        const index = state.admission.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.admission[index] = action.payload.data;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateAdmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAdmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdmission.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.admission = state.admission.filter(
          (enq) => enq._id !== action.payload.id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteAdmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(admissionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(admissionStatus.fulfilled, (state, action) => {
        const index = state.admission.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.admission[index].status = action.payload.data.status;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(admissionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { getclear } = AdmissionSlice.actions;
export default AdmissionSlice.reducer;
