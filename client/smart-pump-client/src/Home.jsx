import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context";

export default function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log("home user", user);

  return (
    <>
      <main className="main">
        <div className="container-welcome">
          <div className="image-container">
            <img
              className="logo"
              src="../public/logo.png"
              alt="Smart Pump logo"
            />
          </div>
          <h1 className="center">{`Hello ${user.name.first}!`}</h1>
        </div>
        <div className="container-data">
          <h2 className="center">Profile details:</h2>
          <ul>
            <li>
              <div className="profile-pic-container">
                <img
                  src={user.picture}
                  alt={`Profile Picture of ${user.name.first} ${user.name.last} not found`}
                />
              </div>
            </li>
            <li>Age: {user.age}</li>
            <li>Eye Color: {user.eyeColor}</li>
            <li>Company: {user.company}</li>
            <li>Phone: {user.phone}</li>
            <li>Email: {user.email}</li>
            <li>Adress: {user.address}</li>
          </ul>

          <button
            className="button center"
            onClick={() => navigate("/edit-profile")}
          >
            Update Profile information
          </button>
          <button
            className="button center"
            onClick={() => navigate("/balance")}
          >
            Check balance
          </button>
        </div>
      </main>
    </>
  );
}
