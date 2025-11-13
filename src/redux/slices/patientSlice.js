import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { patientService } from '../../services';

const initialState = {
  patients: [],
  currentPatient: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchAllPatients = createAsyncThunk(
  'patients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await patientService.getAllPatients();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch patients');
    }
  }
);

export const fetchPatientById = createAsyncThunk(
  'patients/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await patientService.getPatientById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch patient');
    }
  }
);

export const createPatient = createAsyncThunk(
  'patients/create',
  async (patientData, { rejectWithValue }) => {
    try {
      return await patientService.createPatient(patientData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create patient');
    }
  }
);

export const updatePatient = createAsyncThunk(
  'patients/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await patientService.updatePatient(id, data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update patient');
    }
  }
);

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    clearCurrentPatient: (state) => {
      state.currentPatient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all patients
      .addCase(fetchAllPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchAllPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch patient by ID
      .addCase(fetchPatientById.fulfilled, (state, action) => {
        state.currentPatient = action.payload;
      })
      // Create patient
      .addCase(createPatient.fulfilled, (state, action) => {
        state.patients.push(action.payload);
        state.currentPatient = action.payload;
      })
      // Update patient
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.patients.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.patients[index] = action.payload;
        }
        state.currentPatient = action.payload;
      });
  },
});

export const { clearCurrentPatient } = patientSlice.actions;
export default patientSlice.reducer;

