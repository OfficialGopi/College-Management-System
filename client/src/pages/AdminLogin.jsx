import { LoginRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { GraduationIcon } from "../assets/icons/GraduationIcon";
import { useEffect, useState } from "react";
import { adminAuth, loginByToken } from "../services/authentication";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../toolkits/features/admin/authSlice";

const AdminLogin = () => {
  const loginProcess = () => {
    if (localStorage.getItem("cms-token")) {
      loginByToken(localStorage.getItem("cms-token")).then((data) => {
        if (data.role) {
          console.log(data.role);
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.value);

  const [username, setUsername] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showSecretKey, setShowSecretKey] = useState(false);
  const togglesecretKeyVisibility = () => {
    setShowSecretKey(!showSecretKey);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    adminAuth(username, secretKey)
      .then((res) => {
        if (res.success) {
          dispatch(login(res.data));
          navigate("/admin/in");
          toast.success("Login successful!");
        }
      })
      .catch(() => {
        toast.error("Invalid Credentials");
      });
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
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <Link
          className="hover:bg-black w-[120px] absolute top-4 left-4 hover:font-bold	 hover:w-[135px] justify-center items-center transition-all gap-2 border-2  flex rounded-xl bg-white text-black hover:text-white p-3 "
          to={"/login"}
        >
          <LoginRounded
            fontSize="large"
            sx={{
              transform: "rotateY(180deg)",
            }}
          />
          <span>User login</span>
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

              {/* ID Field */}
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

              {/* secretKey Field with Toggle Visibility */}
              <TextField
                fullWidth
                margin="normal"
                label="Secret Key"
                variant="outlined"
                type={showSecretKey ? "text" : "password"}
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglesecretKeyVisibility}
                        edge="end"
                      >
                        {showSecretKey ? <Visibility /> : <VisibilityOff />}
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
    </>
  );
};

export default AdminLogin;
