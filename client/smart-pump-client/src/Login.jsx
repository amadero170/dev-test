import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function login() {

    setError("");

    // validate user

    const res = await fetch("http://localhost:3002/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

if (!res.ok){setError("Username or password incorrect")
return}
    const user = await res.json();

    if (user && user._id) {
      setUser(user);
      navigate("/");
    } 
  }
  function handleSubmit(event) {
    event.preventDefault();
    login();
  }

  return (
    <>
      <header>
        <div className="image-container">
          <img
            className="logo"
            alt="Smart Pump logo"
            src="../public/logo.png"
          />
        </div>
      </header>
      <h2 className="title">Please login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username
          <br />
          <input
            style={{ width: "100%" }}
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            value={username}
          />
        </div>
        <div>
          Password
          <br />
          <input
            style={{ width: "100%" }}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
          />
        </div>
        <div className="center">
          <button className="button" type="submit">
            Login
          </button>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </>
  );
}
