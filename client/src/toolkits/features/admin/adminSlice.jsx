import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAuthenticated: false,
    initialized: false,
    value: {
      studentsByGender: {
        male: null,
        female: null,
        others: null,
      },
      subjectsPerDepartment: {
        CSE: null,
        IT: null,
        LT: null,
      },
      totalStudentCount: null,
      totalTeachers: null,
      notices: null,
    },
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    initializationDone: (state) => {
      state.initialized = true;
    },
    initializeStudentData: (state, action) => {
      state.value.studentsByGender = action.payload;
      state.value.totalStudentCount =
        action.payload.male + action.payload.female + action.payload.others;
    },
    initializeTeacherCount: (state, action) => {
      state.value.totalTeachers = action.payload;
    },
    initializeSubjectsPerDepartment: (state, action) => {
      state.value.subjectsPerDepartment = action.payload;
    },
    updateNotices: (state, action) => {
      state.value.notices = action.payload;
    },
    addStudent: (state, action) => {
      state.value.studentsByGender = action.payload;
      state.value.totalStudentCount += 1;
    },
    removeStudent: (state, action) => {
      state.value.studentsByGender = action.payload;
      state.value.totalStudentCount -= 1;
    },
    updateSubjectsPerDepartment: (state, action) => {
      state.value.subjectsPerDepartment = action.payload;
    },
    addTeacherCount: (state) => {
      state.value.totalTeachers += 1;
    },
    removeTeacherCount: (state) => {
      state.value.totalTeachers -= 1;
    },
  },
});

export const {
  login,
  logout,
  initializeStudentData,
  initializeTeacherCount,
  initializeSubjectsPerDepartment,
  addTeacherCount,
  removeTeacherCount,
  updateSubjectsPerDepartment,
  addStudent,
  removeStudent,
  updateNotices,
} = adminSlice.actions;

export default adminSlice.reducer;
