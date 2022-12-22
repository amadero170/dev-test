import React, { useState } from "react";
import UserContext from "./context.js";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Balance from "./Balance.jsx";
import EditProfile from "./EditProfile.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={!user ? <Navigate to="/login" /> : <Home />}
          />
          <Route path="/login" exact element={<Login />} />
          <Route
            path="/balance"
            exact
            element={!user ? <Navigate to="/login" /> : <Balance />}
          />
          <Route
            path="/edit-profile"
            exact
            element={!user ? <Navigate to="/login" /> : <EditProfile />}
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
