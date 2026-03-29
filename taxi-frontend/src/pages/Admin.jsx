import { useState, useEffect } from "react";
import API from "../services/api";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  Tabs,
  Tab,
} from "@mui/material";
import Toast from "../components/Toast";

export default function Admin({ setPage }) {
  const [tab, setTab] = useState(0);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [baseFare, setBaseFare] = useState("");
  const [perKmRate, setPerKmRate] = useState("");
  const [bookings, setBookings] = useState([]);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setToast({ open: true, msg: "Please login first", type: "error" });
    }
  }, [token]);

  useEffect(() => {
    if (tab === 1) {
      getBookings();
    }
  }, [tab]);

  // 🚗 Add Vehicle
  const addVehicle = async () => {
    if (!name || !type || !baseFare || !perKmRate) {
      return setToast({
        open: true,
        msg: "All fields required",
        type: "error",
      });
    }

    try {
      await API.post(
        "/vehicles",
        {
          name,
          type,
          baseFare: Number(baseFare),
          perKmRate: Number(perKmRate),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setToast({
        open: true,
        msg: "Vehicle added successfully",
        type: "success",
      });

      setName("");
      setType("");
      setBaseFare("");
      setPerKmRate("");
    } catch {
      setToast({
        open: true,
        msg: "Failed to add vehicle",
        type: "error",
      });
    }
  };

  // 📦 Get Bookings
  const getBookings = async () => {
    try {
      const res = await API.get("/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch {
      setToast({
        open: true,
        msg: "Failed to load bookings",
        type: "error",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Box sx={styles.container}>
      {/* LEFT SIDE */}
      <Box sx={styles.left}>
        <Box sx={styles.leftContent}>
          <Typography sx={styles.heading}>Admin Dashboard </Typography>
          <Typography sx={styles.subText}>
            Manage vehicles and track bookings easily.
          </Typography>
        </Box>
      </Box>

      {/* RIGHT CARD */}
      <Card sx={styles.card}>
        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          centered
          sx={styles.tabs}
        >
          <Tab label="Admin Panel 🚗" />
          <Tab label="Bookings 📦" />
        </Tabs>

        {/* ================= ADMIN TAB ================= */}
        {tab === 0 && (
          <>
            <Typography fontWeight="bold" mb={1}>
              Add Vehicle
            </Typography>

            <TextField
              fullWidth
              label="Vehicle Name"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              fullWidth
              label="Type"
              margin="normal"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <TextField
              fullWidth
              label="Base Fare"
              type="number"
              margin="normal"
              value={baseFare}
              onChange={(e) => setBaseFare(e.target.value)}
            />

            <TextField
              fullWidth
              label="Per Km Rate"
              type="number"
              margin="normal"
              value={perKmRate}
              onChange={(e) => setPerKmRate(e.target.value)}
            />

            <Button fullWidth sx={styles.primaryBtn} onClick={addVehicle}>
              Add Vehicle
            </Button>
          </>
        )}

        {/* ================= BOOKINGS TAB ================= */}
        {tab === 1 && (
          <>
            <Typography fontWeight="bold" mb={1}>
              Booked Rides
            </Typography>
            {/* 
            <Button fullWidth sx={styles.secondaryBtn} onClick={getBookings}>
              Load Bookings
            </Button> */}

            <Box mt={2}>
              {bookings.map((b) => (
                <Box key={b.id} sx={styles.bookingItem}>
                  <Typography fontWeight="bold">
                    {b.pickupLocation} → {b.dropLocation}
                  </Typography>
                  <Typography variant="body2">Fare: ₹{b.fare}</Typography>
                </Box>
              ))}
            </Box>
          </>
        )}

        {/* Logout */}
        <Button fullWidth color="error" sx={{ mt: 2 }} onClick={logout}>
          Logout
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

  // 🔥 FIXED LEFT SECTION
  left: {
    flex: 1,
    background: "#f7c948",
    display: "flex",
    alignItems: "center", // ✅ vertical center
    paddingLeft: "120px", // 🔥 KEY FIX (remove center feel)
  },

  // 🔥 CONTROL TEXT WIDTH
  leftContent: {
    maxWidth: "420px",
  },

  // 🔥 SMALL LABEL (NEW)
  tagline: {
    fontSize: "13px",
    letterSpacing: "2px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  },

  // 🔥 MAIN HEADING (IMPROVED)
  heading: {
    fontWeight: "800",
    fontSize: "48px", // 🔥 bigger & cleaner
    lineHeight: 1.2,
    letterSpacing: "-1px",
  },

  // 🔥 SUB TEXT (IMPROVED)
  subText: {
    marginTop: "16px",
    fontSize: "16px",
    color: "#444",
  },

  // 🔥 CARD (SLIGHTLY BETTER POSITION)
  card: {
    width: "420px",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    position: "absolute",
    right: "10%", // 🔥 better balance
    top: "50%",
    transform: "translateY(-50%)",
  },

  tabs: {
    mb: 2,
    "& .MuiTabs-indicator": {
      backgroundColor: "#f7c948",
      height: "3px",
    },
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

  secondaryBtn: {
    mt: 2,
    background: "#000",
    color: "#fff",
    "&:hover": {
      background: "#333",
    },
  },

  bookingItem: {
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    background: "rgba(0,0,0,0.05)",
    backdropFilter: "blur(6px)", // ✨ small premium touch
  },
};
