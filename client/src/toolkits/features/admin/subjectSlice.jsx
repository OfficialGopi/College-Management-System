import { createSlice } from "@reduxjs/toolkit";

const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    initialized: false,
    subjects: [],
  },
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    subjectsInitialized: (state, action) => {
      state.initialized = true;
    },
  },
});

export const { setSubjects, subjectsInitialized } = subjectSlice.actions;

export default subjectSlice.reducer;
