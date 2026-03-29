import { useState } from "react";
import API from "../services/api";
import Toast from "../components/Toast";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CircularProgress,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";

export default function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const login = async () => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });

      const token = res.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      localStorage.setItem("role", decoded.role);

      setToast({ open: true, msg: "Login successful", type: "success" });

      setPage(decoded.role === "ADMIN" ? "admin" : "booking");
    } catch (err) {
      setToast({
        open: true,
        msg: err.response?.data?.message || "Login failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.left}>
        <Box sx={styles.leftContent}>
          <Typography sx={styles.heading}>Welcome Back </Typography>
          <Typography sx={styles.subText}>
            Login to continue your journey
          </Typography>
        </Box>
      </Box>

      <Card sx={styles.card}>
        <Typography variant="h5" mb={2} fontWeight="bold">
          Login
        </Typography>

        <TextField fullWidth label="Email" margin="normal" value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <TextField fullWidth type="password" label="Password" margin="normal"
          value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button fullWidth sx={styles.primaryBtn} onClick={login} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <Button fullWidth onClick={() => setPage("register")} sx={{ mt: 2 }}>
          Create Account
        </Button>
      </Card>

      <Toast {...toast} onClose={() => setToast({ ...toast, open: false })} />
    </Box>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
  },

  // 🔥 FIXED LEFT SIDE (same as others)
  left: {
    flex: 1,
    background: "#f7c948",
    display: "flex",
    alignItems: "center",
    paddingLeft: "120px", // 🔥 main fix
  },

  leftContent: {
    maxWidth: "420px",
  },

  // 🔥 ADD THIS (important for hierarchy)
  tagline: {
    fontSize: "13px",
    letterSpacing: "2px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  },

  // 🔥 IMPROVED HEADING
  heading: {
    fontWeight: "800",
    fontSize: "48px",
    lineHeight: 1.2,
    letterSpacing: "-1px",
  },

  // 🔥 IMPROVED SUBTEXT
  subText: {
    marginTop: "16px",
    fontSize: "16px",
    color: "#444",
  },

  // 🔥 CARD BALANCED
  card: {
    width: "400px",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    position: "absolute",
    right: "10%", // 🔥 better spacing
    top: "50%",
    transform: "translateY(-50%)",
    textAlign: "left",
  },

  primaryBtn: {
    mt: 2,
    background: "#f7c948",
    color: "#000",
    fontWeight: "bold",
    "&:hover": {
      background: "#e0b437",
    },
  },
};