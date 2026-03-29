import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Card,
} from "@mui/material";
import Toast from "../components/Toast";

export default function Booking({ setPage }) {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [distance, setDistance] = useState("");
  const [fare, setFare] = useState(null);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVehicles = async () => {
      const res = await API.get("/vehicles");
      setVehicles(res.data);
    };
    fetchVehicles();
  }, []);

  const getFare = async () => {
    try {
      const res = await API.post("/fare/estimate", {
        vehicleId,
        distance: Number(distance),
      });
      setFare(res.data.fare);
    } catch (err) {
      setToast({
        open: true,
        msg: "Failed to calculate fare",
        type: "error",
      });
    }
  };

  const bookRide = async () => {
    if (!vehicleId || !pickup || !drop || !distance) {
      return setToast({
        open: true,
        msg: "Please fill all fields",
        type: "error",
      });
    }

    try {
      const res = await API.post(
        "/bookings",
        {
          vehicleId,
          pickupLocation: pickup,
          dropLocation: drop,
          distance: Number(distance),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setToast({
        open: true,
        msg: `Booking Confirmed! `,
        type: "success",
      });

      // Reset form
      setPickup("");
      setDrop("");
      setDistance("");
      setVehicleId("");
      setFare(null);
    } catch (err) {
      setToast({
        open: true,
        msg: err.response?.data?.message || "Booking failed",
        type: "error",
      });
    }
  };

  // ✅ FIXED LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // full reset
  };

  return (
    <Box sx={styles.container}>
      {/* LEFT SIDE */}
      <Box sx={styles.left}>
        <Typography variant="h3" fontWeight="bold">
          Always There When You Need a Taxi 
        </Typography>
        <Typography mt={2}>
          Fast, reliable and affordable rides anytime.
        </Typography>
      </Box>

      {/* RIGHT SIDE FORM */}
      <Card sx={styles.card}>
        <Typography variant="h5" mb={2} fontWeight="bold">
          Make Your Trip
        </Typography>

        <TextField
          fullWidth
          label="Pickup Location"
          margin="normal"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />

        <TextField
          fullWidth
          label="Drop Location"
          margin="normal"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
        />

        <TextField
          fullWidth
          label="Distance (km)"
          type="number"
          margin="normal"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />

        <TextField
          select
          fullWidth
          label="Select Vehicle"
          margin="normal"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
        >
          {vehicles.map((v) => (
            <MenuItem key={v.id} value={v.id}>
              {v.name} ({v.type})
            </MenuItem>
          ))}
        </TextField>

        {/* Get Fare Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={getFare}
          sx={styles.fareBtn}
        >
          Get Fare
        </Button>

        {/* ✅ Transparent Fare Box */}
        {fare && (
          <Box sx={styles.fareBox}>
            <Typography variant="subtitle2">
              Estimated Fare
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              ₹{fare}
            </Typography>
          </Box>
        )}

        {/* Book Ride */}
        <Button
          fullWidth
          variant="contained"
          onClick={bookRide}
          sx={styles.bookBtn}
        >
          Book Now
        </Button>

        {/* Logout */}
        <Button
          fullWidth
          color="error"
          onClick={logout}
          sx={{ mt: 2 }}
        >
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
    display: "flex",
    flexDirection: "row",
  },

  left: {
    flex: 1,
    background: "#f7c948",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px",
    color: "#000",
  },

  card: {
    width: "420px",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    position: "absolute",
    right: "8%",
    top: "50%",
    transform: "translateY(-50%)",
  },

  fareBtn: {
    mt: 2,
    background: "#000",
    color: "#fff",
    "&:hover": { background: "#333" },
  },

  bookBtn: {
    mt: 2,
    background: "#f7c948",
    color: "#000",
    fontWeight: "bold",
    "&:hover": { background: "#e0b437" },
  },

  // ✅ Glassmorphism Fare Box
  fareBox: {
    marginTop: "16px",
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(247, 201, 72, 0.25)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "#000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};