import { Snackbar, Alert } from "@mui/material";

export default function Toast({ open, msg, type, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert severity={type} variant="filled" sx={{ borderRadius: "10px" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}