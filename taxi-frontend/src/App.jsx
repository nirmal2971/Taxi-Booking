import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      {page === "login" && <Login setPage={setPage} />}
      {page === "register" && <Register setPage={setPage} />}
      {page === "booking" && <Booking />}
      {page === "admin" && <Admin />}
    </div>
  );
}

export default App;