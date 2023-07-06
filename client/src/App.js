import "./App.css";
import SignUpPage from "./Components/SignUpPage";
import LogInPage from "./Components/LoginPage";
import HomePage from "./HomePage";
import CallingTwilio from "./Pages/CallingTwilio";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignUpPage" element={<SignUpPage />} />
        <Route path="/LogIn" element={<LogInPage />} />
        <Route path="/calling" element={<CallingTwilio/>}  />
      </Routes>
    </div>
  );
}

export default App;
