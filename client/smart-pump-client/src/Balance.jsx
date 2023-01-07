import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context";

export default function Balance() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [balance, setBalance] = useState("");

  const balanceCheck = async (u) => {
    const res = await fetch("http://localhost:3002/api/balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: u._id,
      }),
    });

    if (!res.status === 200) {
      navigate("/");
    }
    const balance = await res.json();
    setBalance(balance);
  };

  balanceCheck(user);

  const navigateHome = () => {
    setBalance("");
    navigate("/");
  };

  return (
    <div>
      <h1>Balance</h1>
      <h2>{balance}</h2>
      <button className="button" onClick={navigateHome}>
        Home
      </button>
    </div>
  );
}
