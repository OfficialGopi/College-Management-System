import { useEffect, useState } from "react";
import { GraduationIcon } from "./../assets/icons/GraduationIcon";
import {
	Container,
	TextField,
	Button,
	IconButton,
	InputAdornment,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
	Box,
	Paper,
} from "@mui/material";
import {
	LoginOutlined,
	LoginRounded,
	Visibility,
	VisibilityOff,
} from "@mui/icons-material";
import LoginIcon from "../assets/icons/LoginIcon";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken, loginByToken } from "../services/authentication";
import { login } from "../toolkits/features/admin/authSlice";
import toast from "react-hot-toast";

function Login() {
	const loginProcess = () => {
		if (localStorage.getItem("cms-token")) {
			toast
				.promise(loginByToken(localStorage.getItem("cms-token")), {
					loading: "Checking login...",
					success: "Login successful!",
					error: "Failed to check login. Please try again.",
				})
				.then((data) => {
					if (data.role) {
						dispatch(login(data));
						if (data.role === "student") {
							navigate("/in/student/");
						} else if (data.role === "teacher") {
							navigate("/in/teacher/");
						}
					} else {
						localStorage.removeItem("cms-token");
						navigate("/login");
					}
				});
		}
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth.value);
	const [role, setRole] = useState("student");
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = () => {
		toast
			.promise(getToken(role, id, password), {
				loading: "Logging in...",
				success: "Logged in successfully!",
				error: "Failed to login. Please check your credentials and try again.",
			})
			.then((token) => {
				if (token.token) {
					localStorage.setItem("cms-token", token.token);
					loginProcess();
				}
			});
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	useEffect(() => {
		if (auth) {
			if (auth.role === "student") {
				navigate("/in/student/");
			} else if (auth.role === "teacher") {
				navigate("/in/teacher/");
			}
		} else {
			loginProcess();
		}
	}, []);
	return (
		<div className="h-screen w-screen flex justify-center relative items-center">
			<Link
				className="hover:bg-black w-[120px] absolute top-4 right-4 hover:font-bold	 hover:w-[135px] justify-center items-center transition-all gap-2 border-2  flex rounded-xl bg-white text-black hover:text-white p-3 "
				to={"/admin/login"}
			>
				<span>Admin Panel</span>
				<LoginRounded fontSize="large" />
			</Link>
			<Container maxWidth="xs">
				<Paper
					variant="outlined"
					sx={{
						border: "1px solid black",
						padding: 3,
						borderRadius: 2,
						backgroundColor: "white",
					}}
				>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
					>
						<GraduationIcon len="100px" />
						<Typography variant="h5" gutterBottom>
							College Management System
						</Typography>

						{/* Role Selection */}
						<FormControl component="fieldset" margin="normal">
							<RadioGroup
								row
								value={role}
								onChange={(e) => setRole(e.target.value)}
							>
								<FormControlLabel
									value="student"
									control={
										<Radio
											sx={{
												color: "black",
												"&.Mui-checked": {
													color: "black",
												},
											}}
										/>
									}
									label="Student"
								/>
								<FormControlLabel
									value="teacher"
									control={
										<Radio
											sx={{
												color: "black",
												"&.Mui-checked": {
													color: "black",
												},
											}}
										/>
									}
									label="Teacher"
								/>
							</RadioGroup>
						</FormControl>

						{/* ID Field */}
						<TextField
							fullWidth
							margin="normal"
							label="ID"
							variant="outlined"
							value={id}
							onChange={(e) => setId(e.target.value)}
							sx={{
								"& label.Mui-focused": {
									color: "black",
								},
								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										borderColor: "black",
									},
									"&:hover fieldset": {
										borderColor: "black",
									},
									"&.Mui-focused fieldset": {
										borderColor: "black",
									},
								},
							}}
						/>

						{/* Password Field with Toggle Visibility */}
						<TextField
							fullWidth
							margin="normal"
							label="Password"
							variant="outlined"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={togglePasswordVisibility}
											edge="end"
										>
											{showPassword ? (
												<Visibility />
											) : (
												<VisibilityOff />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{
								"& label.Mui-focused": {
									color: "black",
								},
								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										borderColor: "black",
									},
									"&:hover fieldset": {
										borderColor: "black",
									},
									"&.Mui-focused fieldset": {
										borderColor: "black",
									},
								},
							}}
						/>

						{/* Login Button */}
						<Button
							fullWidth
							variant="contained"
							onClick={handleLogin}
							sx={{
								mt: 2,
								backgroundColor: "black",
								color: "white",
								"&:hover": {
									backgroundColor: "black",
								},
							}}
						>
							Login
						</Button>
					</Box>
				</Paper>
			</Container>
		</div>
	);
}

export default Login;
