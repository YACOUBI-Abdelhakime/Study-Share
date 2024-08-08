import LoginScreen from "./screens/LoginScreen/LoginScreen";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import SignupScreen from "./screens/SignupScreen/SignupScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "./utils/ProtectRoutes/ProtectRoute";
import { useSelector } from "react-redux";

function App() {
  const isSignedIn = useSelector(
    (state: any) => state.userReducer.user != null
  );
  console.log("isSignedIn > " + isSignedIn);
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ height: `calc(100vh - 55px)`, marginTop: "55px" }}>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectRoute isSignedIn={!isSignedIn} navigateTo="/home">
                <LoginScreen />
              </ProtectRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <ProtectRoute isSignedIn={!isSignedIn} navigateTo="/home">
                <SignupScreen />
              </ProtectRoute>
            }
          ></Route>
          <Route
            path="/"
            element={
              <ProtectRoute isSignedIn={isSignedIn}>
                <div>Home</div>
              </ProtectRoute>
            }
          ></Route>
          <Route
            path="/home"
            element={
              <ProtectRoute isSignedIn={isSignedIn}>
                <div>Home</div>
              </ProtectRoute>
            }
          ></Route>
          <Route
            path="/messages"
            element={
              <ProtectRoute isSignedIn={isSignedIn}>
                <div>Messages</div>
              </ProtectRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectRoute isSignedIn={isSignedIn}>
                <div>Profile</div>
              </ProtectRoute>
            }
          ></Route>
          <Route
            path="/notifications"
            element={
              <ProtectRoute isSignedIn={isSignedIn}>
                <div>Notifications</div>
              </ProtectRoute>
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
