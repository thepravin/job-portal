import { createSlice } from "@reduxjs/toolkit";

const isAuthorizedSlice = createSlice({
  name: "isAuthorized",
  initialState: false,
  reducers: {
    setIsAuthorized: (state, action) => {
      return action.payload; // Use the payload to set the state
    },
  },
});


export const { setIsAuthorized } = isAuthorizedSlice.actions;
export default isAuthorizedSlice.reducer;
