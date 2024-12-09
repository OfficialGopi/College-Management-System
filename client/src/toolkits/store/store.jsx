import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/user/authSlice";
import adminSlice from "../features/admin/adminSlice";
import adminSubjectSlice from "../features/admin/subjectSlice";
export default configureStore({
  reducer: {
    auth: authSlice,
    admin: adminSlice,
    adminSubjects: adminSubjectSlice,
  },
});
