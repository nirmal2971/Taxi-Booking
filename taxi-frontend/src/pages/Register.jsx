import { useState } from "react";
import API from "../services/api";
import Toast from "../components/Toast";
import { TextField, Button, Typography, Box, Card } from "@mui/material";

export default function Register({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const register = async () => {
    try {
      await API.post("/auth/register", { name, email, password });

      setToast({
        open: true,
        msg: "Registered successfully",
        type: "success",
      });

      setPage("login");
    } catch (err) {
      setToast({
        open: true,
        msg: err.response?.data?.message || "Error",
        type: "error",
      });
    }
  };

  return (
    <Box sx={styles.container}>
      {/* LEFT SIDE */}
      <Box sx={styles.left}>
        <Box sx={styles.leftContent}>
          <Typography sx={styles.heading}>
            Join Our Taxi Service 🚖
          </Typography>

          <Typography sx={styles.subText}>
            Create your account and start booking rides instantly.
          </Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE CARD */}
      <Card sx={styles.card}>
        <Typography variant="h5" mb={2} fontWeight="bold">
          Register
        </Typography>

        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={register}
          sx={styles.primaryBtn}
        >
          Register
        </Button>

        <Button
          fullWidth
          onClick={() => setPage("login")}
          sx={{ mt: 2 }}
        >
          Back to Login
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

  // 🔥 FIXED LEFT SIDE (same pattern everywhere)
  left: {
    flex: 1,
    background: "#f7c948",
    display: "flex",
    alignItems: "center",
    paddingLeft: "120px", // 🔥 key fix
  },

  leftContent: {
    maxWidth: "420px",
  },

  // 🔥 ADD TAGLINE (NEW)
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
    right: "10%", // 🔥 better alignment
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