import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context";

export default function Balance() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log("balance user", user);
  return (
    <div>
      <h1>Balance</h1>
      <h2>{user.balance}</h2>
      <button className="button" onClick={() => navigate("/")}>
        Home
      </button>
    </div>
  );
}
