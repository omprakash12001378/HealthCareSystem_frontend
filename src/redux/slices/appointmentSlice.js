import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { appointmentService } from '../../services';

const initialState = {
  appointments: [],
  currentAppointment: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchAllAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await appointmentService.getAllAppointments();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointments');
    }
  }
);

export const fetchAppointmentsByPatientId = createAsyncThunk(
  'appointments/fetchByPatientId',
  async (patientId, { rejectWithValue }) => {
    try {
      return await appointmentService.getAppointmentsByPatientId(patientId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointments');
    }
  }
);

export const createAppointment = createAsyncThunk(
  'appointments/create',
  async (appointmentData, { rejectWithValue }) => {
    try {
      return await appointmentService.createAppointment(appointmentData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create appointment');
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  'appointments/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await appointmentService.updateAppointmentStatus(id, status);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update appointment status');
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearCurrentAppointment: (state) => {
      state.currentAppointment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all appointments
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch appointments by patient ID
      .addCase(fetchAppointmentsByPatientId.fulfilled, (state, action) => {
        state.appointments = action.payload;
      })
      // Create appointment
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      })
      // Update appointment status
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      });
  },
});

export const { clearCurrentAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;

