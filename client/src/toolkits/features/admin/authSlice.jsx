import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "login",
	initialState: {
		value: null,
	},
	reducers: {
		login: (state, action) => {
			state.value = action.payload;
		},
		logout: (state) => {
			localStorage.removeItem("cms-token");
			state.value = null;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
