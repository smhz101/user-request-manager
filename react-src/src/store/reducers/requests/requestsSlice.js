import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: {
    requestStatuses: {},
    error: null
  },
  reducers: {
    requestStatusUpdated: (state, action) => {
      const { id, status } = action.payload;
      state.requestStatuses[id] = status;
    },
    requestStatusUpdateFailed: (state, action) => {
      const { id, error } = action.payload;
      state.error = error;
    },
  }
});

export const { requestStatusUpdated, requestStatusUpdateFailed } = requestsSlice.actions;

export default requestsSlice.reducer;