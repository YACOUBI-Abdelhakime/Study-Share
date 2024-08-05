import LoginScreen from "./screens/LoginScreen/LoginScreen";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import SignupScreen from "./screens/SignupScreen/SignupScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div style={{ height: `calc(100vh - 55px)`, marginTop: "55px" }}>
          <Routes>
            <Route path="/" element={<LoginScreen />}></Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/register" element={<SignupScreen />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
