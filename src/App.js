import { useState, useEffect } from "react";
import Login from "./Login.js";
import Home from "./Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { auth } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <Login
                user={user}
                setUser={setUser}
                username={username}
                setUsername={setUsername}
              />
            )}
          />
          <Route
            path="/home"
            exact
            component={() => <Home user={user} setUsername={setUsername} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
