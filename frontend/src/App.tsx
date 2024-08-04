import LoginScreen from "./screens/LoginScreen/LoginScreen";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ height: `calc(100vh - 55px)`, marginTop: "55px" }}>
        <LoginScreen />
      </div>
    </>
  );
}

export default App;
