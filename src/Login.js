import { useState} from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { useHistory } from "react-router";

export default function Login({ user, setUser, username, setUsername }) {
  const [mode, setMode] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { push } = useHistory();

  const SignInMode = () => {
    setMode(false);
  };
  const SignUpMode = () => {
    setMode(true);
  };

  const signUp = (e) => {
    e.preventDefault();
    if (mode) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          authUser.user.updateProfile({
            displayName: username
          });
        })
        .catch((error) => alert(error.message));
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error.message));
    }
    push("/home");
  };

  const enabled = email.length > 0 && password.length > 0;

  return (
    <div className="Login">
      <div className="sign">
        <button className="signIn" onClick={SignInMode}>
          Sign In
        </button>
        <button className="signUp" onClick={SignUpMode}>
          Sign Up
        </button>
      </div>
      <div className="box">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          alt="logo"
          width="200px"
        />
        {mode && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/home">
          <button
            type="submit"
            className="login"
            disabled={!enabled}
            onClick={signUp}
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
