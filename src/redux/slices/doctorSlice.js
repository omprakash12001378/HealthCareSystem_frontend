import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doctorAPI } from '../../services/api';
import toast from 'react-hot-toast';

// Async thunks
export const fetchAllDoctors = createAsyncThunk(
  'doctors/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await doctorAPI.getAll();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchActiveDoctors = createAsyncThunk(
  'doctors/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const response = await doctorAPI.getActive();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchDoctorsBySpecialization = createAsyncThunk(
  'doctors/fetchBySpecialization',
  async (specialization, { rejectWithValue }) => {
    try {
      const response = await doctorAPI.getBySpecialization(specialization);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const searchDoctors = createAsyncThunk(
  'doctors/search',
  async (query, { rejectWithValue }) => {
    try {
      const response = await doctorAPI.search(query);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    selectedDoctor: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    clearDoctors: (state) => {
      state.doctors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchActiveDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorsBySpecialization.fulfilled, (state, action) => {
        state.doctors = action.payload;
      })
      .addCase(searchDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
      });
  },
});

export const { setSelectedDoctor, clearDoctors } = doctorSlice.actions;
export default doctorSlice.reducer;

