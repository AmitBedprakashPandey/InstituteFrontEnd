import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/fees";

export const getFeesbyId = createAsyncThunk(
  "Fees/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const createFees = createAsyncThunk(
  "Fees/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const updateFees = createAsyncThunk(
  "Fees/update",
  async (data, { rejectWithValue }) => {
    
    try {
      const response = await axios.put(`${url}/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const deleteFees = createAsyncThunk(
  "Fees/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
export const FeesStatus = createAsyncThunk(
  "Fees/status",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/status/${data._id}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);

export const findBalanceAmtbyStudentName = createAsyncThunk(
  "Fees/findBalanceAmt",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axios.get(`${url}/paidamt/${data.studentname}/${localStorage.getItem("userid")}`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error);
    }
  }
);
const FeesSlice = createSlice({
  name: "Fees",
  initialState: {
    Fees: [],
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
      .addCase(getFeesbyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeesbyId.fulfilled, (state, action) => {
        state.Fees = action.payload?.data;                
        state.loading = false;
        state.error = null;
      })
      .addCase(getFeesbyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.Fees.push(action.payload?.data);

        state.message = action.payload?.message;
      })
      .addCase(createFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFees.fulfilled, (state, action) => {
        const index = state.Fees.findIndex(
          (enq) => enq._id === action.payload?.data._id
        );
        if (index !== -1) {
          state.Fees[index] = action.payload?.data;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload?.message;
      })
      .addCase(updateFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.Fees = state.Fees.filter(
          (enq) => enq._id !== action.payload.id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(FeesStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(FeesStatus.fulfilled, (state, action) => {
        const index = state.Fees.findIndex(
          (enq) => enq._id === action.payload.data._id
        );
        if (index !== -1) {
          state.Fees[index].status = action.payload.data.status;
        }
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(FeesStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { getclear } = FeesSlice.actions;
export default FeesSlice.reducer;
