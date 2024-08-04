import LoginForm from "./components/LoginForm";
import SignupInfo from "./components/SignupInfo";

export default function LoginScreen() {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <LoginForm />
        <SignupInfo />
      </div>
    </div>
  );
}
