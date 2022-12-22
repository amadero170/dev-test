import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context";

export default function EditProfile() {
  const { user, setUser } = useContext(UserContext);
  const [age, setAge] = useState(user.age);
  const [eyeColor, setEyeColor] = useState(user.eyeColor);
  const [company, setCompany] = useState(user.company);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [picture, setPicture] = useState(user.picture);
  const [firstName, setFirstName] = useState(user.name.first);
  const [lastName, setLastName] = useState(user.name.last);
  const _id = user._id;
  const navigate = useNavigate();

  const updatedUser = {
    age,
    eyeColor,
    company,
    phone,
    address,
    picture,
    email: user.email,
    name: { first: firstName, last: lastName },
    _id,
    balance: user.balance,
  };

  function handleSubmit(event) {
    event.preventDefault();
    updateProfile();
  }

  async function updateProfile() {
    const res = await fetch("http://localhost:3002/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updatedUser,
      }),
    });
    console.log(res.ok);

    if (res.ok === true) {
      setUser(updatedUser);
      navigate("/");
    }
  }

  return (
    <div>
      <header>
        <h1>Edit Profile</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div>
            Age:
            <input
              onChange={(event) => setAge(Number(event.target.value))}
              type="text"
              placeholder={user.age}
            />
          </div>
          <div>
            Eye Color:
            <input
              onChange={(event) => setEyeColor(event.target.value)}
              type="text"
              placeholder={user.eyeColor}
            />
          </div>
          <div>
            Company:
            <input
              onChange={(event) => setCompany(event.target.value)}
              type="text"
              placeholder={user.company}
            />
          </div>
          <div>
            Phone:
            <input
              onChange={(event) => setPhone(event.target.value)}
              type="text"
              placeholder={user.phone}
            />
          </div>
          <div>
            Address:
            <input
              onChange={(event) => setAddress(event.target.value)}
              type="text"
              placeholder={user.address}
            />
          </div>
          <div>
            Picture:
            <input
              onChange={(event) => setPicture(event.target.value)}
              type="text"
              placeholder="Paste new picture url"
            />
          </div>
          <div>
            First Name:
            <input
              onChange={(event) => setFirstName(event.target.value)}
              type="text"
              placeholder={user.name.first}
            />
          </div>
          <div>
            Last Name:
            <input
              onChange={(event) => setLastName(event.target.value)}
              type="text"
              placeholder={user.name.last}
            />
          </div>
          <button className="button" type="submit" value="Send">
            Send
          </button>
        </form>

        <button className="button" onClick={() => navigate("/")}>
          Home
        </button>
      </main>
    </div>
  );
}
