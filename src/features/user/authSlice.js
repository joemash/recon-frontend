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
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (registerObj) => {
    const response = await axios.post('v1/user/register/', registerObj, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  }
);

export const login = createAsyncThunk(
  'register/login',
  async (loginObj) => {
    const response = await axios.post('v1/user/login/', loginObj, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  }
);

export default registerSlice.reducer;