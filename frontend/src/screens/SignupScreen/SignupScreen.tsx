import LoginInfo from "./components/LoginInfo";
import SignupForm from "./components/SignupForm";

export default function SignupScreen() {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <SignupForm />
        <LoginInfo />
      </div>
    </div>
  );
}
