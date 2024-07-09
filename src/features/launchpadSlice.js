// src/features/launchpadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for collection request
export const collectionRequest = createAsyncThunk(
  'launchpad/collectionRequest',
  async (collectionData, thunkAPI) => {
    // Implement your collection request logic here
    // Return the result
  }
);

// Add more async thunks for other operations like launchCollection, createNgCollection, etc.

const initialState = {
  collectionRequestName: '',
  collectionRequestSymbol: '',
  collectionRequestCreator: '',
  // ... add all other state properties here
  loading: false,
  error: null,
};

const launchpadSlice = createSlice({
  name: 'launchpad',
  initialState,
  reducers: {
    setCollectionRequestName: (state, action) => {
      state.collectionRequestName = action.payload;
    },
    setCollectionRequestSymbol: (state, action) => {
      state.collectionRequestSymbol = action.payload;
    },
    // ... add more reducers for other state properties
  },
  extraReducers: (builder) => {
    builder
      .addCase(collectionRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(collectionRequest.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the successful result
      })
      .addCase(collectionRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // Add more cases for other async thunks
  },
});

export const {
  setCollectionRequestName,
  setCollectionRequestSymbol,
  // ... export other action creators
} = launchpadSlice.actions;

export default launchpadSlice.reducer;