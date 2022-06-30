import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:route" element={<Dashboard />} />
            <Route path="/:route/:id" element={<Dashboard />} />
          </Routes>
          <ToastContainer
            position="bottom-left"
            theme="dark"
            autoClose={1000}
          />
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
