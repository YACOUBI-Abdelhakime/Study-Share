import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AddPublication from "./screens/AddPublication/AddPublicationScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import SignupScreen from "./screens/SignupScreen/SignupScreen";
import ProtectRoute from "./utils/ProtectRoutes/ProtectRoute";

function App() {
  const isSignedIn = useSelector(
    (state: any) => state.userReducer.user != null
  );
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
                <HomeScreen />
              </ProtectRoute>
            }
          ></Route>
          <Route
            path="/home"
            element={
              <ProtectRoute isSignedIn={isSignedIn}>
                <HomeScreen />
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
          <Route
            path="/add-publication"
            element={
              <ProtectRoute isSignedIn={isSignedIn}>
                <AddPublication />
              </ProtectRoute>
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
