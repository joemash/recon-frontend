import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const registerSlice = createSlice({
  name: 'authentication',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Registration failed'
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      const { access, refresh } = action.payload;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Login failed'
    });
  },
});


export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (registerObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('v1/user/register/', registerObj, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data.detail || 'Registration failed. Please check your input.');
      }
      return rejectWithValue(error.message || 'Something went wrong during registration');
    }
  }
);


export const login = createAsyncThunk(
  'register/login',
  async (loginObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('v1/api/login/', loginObj, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data.detail || 'Invalid username or password');
      }
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export default registerSlice.reducer;