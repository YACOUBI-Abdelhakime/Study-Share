import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Socket } from "socket.io-client";
import "./App.css";
import Alert from "./components/Alert/Alert";
import Navbar from "./components/Navbar/Navbar";
import RightPanel from "./components/RightPanal/RightPanel";
import { connectSocket } from "./features/chat/asyncThuks";
import { AppDispatch } from "./features/store";
import AddPublication from "./screens/AddPublication/AddPublicationScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import SignupScreen from "./screens/SignupScreen/SignupScreen";
import useAuth from "./utils/customHooks/useAuth";
import ProtectRoute from "./utils/ProtectRoutes/ProtectRoute";

export const WebSocketContext = createContext<any>(null); 

function App() {
  const isSignedIn = useAuth();
  const dispatch: AppDispatch = useDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!isSignedIn) return;
    dispatch(connectSocket(setSocket));
  }, [isSignedIn]);

  return (
    <WebSocketContext.Provider value={{ socket, setSocket }}>
      <BrowserRouter>
        <Navbar />
        <Alert />
        <div className="page-body">
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
                  <RightPanel />
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
    </WebSocketContext.Provider>
  );
}

export default App;
