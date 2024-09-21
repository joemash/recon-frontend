import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchReconciliationResults = createAsyncThunk(
  "reconciliations/fetchResults",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/v1/reconciliation/");
      return response.data.results;
    } catch (error) {
      return rejectWithValue(
        error.response.data.detail || "Unable to fetch reconciliations"
      );
    }
  }
);

export const uploadFiles = createAsyncThunk(
  "reconciliations/uploadFiles",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/v1/reconciliation/reconcile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }, 
      });

      toast.success("Files uploaded successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || "Upload failed");
    }
  }
);


const reconciliationsSlice = createSlice({
  name: "reconciliation",
  initialState: {
    results: [], 
    status: 'idle',
    loading: false,
    error: null,
  },
  reducers: { 
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder 
      .addCase(fetchReconciliationResults.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReconciliationResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(fetchReconciliationResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(uploadFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFiles.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to upload files";
      });
  },
});

export const { clearError } = reconciliationsSlice.actions;

// Selectors
export const selectAllRecons = (state) => state.reconciliation;

export const selectReconById = (state, id) => {
  return state.reconciliation.results.find((recon) => recon.id === id);
};

export default reconciliationsSlice.reducer;
