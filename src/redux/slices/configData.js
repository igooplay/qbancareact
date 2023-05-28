import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  configData: null,
};

// Action creators are generated for each case reducer function
export const configDataSlice = createSlice({
  name: "config-data",
  initialState,
  reducers: {
    setConfigData: (state, action) => {
      state.configData = action.payload;
    },
  },
});

export const { setConfigData } = configDataSlice.actions;

export default configDataSlice.reducer;
