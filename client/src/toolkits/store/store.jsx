import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/admin/authSlice";
export default configureStore({
	reducer: {
		auth: authSlice, // Add your slice reducers here
	}, // Add your slice reducers here
});
