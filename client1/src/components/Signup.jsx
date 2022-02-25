import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleInputs = (e) => {
    console.log("Inputs - React", e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    console.log("USER data after click", user);

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, work, password, cpassword }),
    });

    console.log("Worked", res);

    const data = await res.json();

    console.log("Data", data);

    if (data.status === 404 || !data) {
      window.alert("Invalid Registration");

      console.log("INHUSBCB");
    } else {
      window.alert("Registration Successfull");

      console.log("VALID");

      navigate("/login");
    }
  };

  return (
    <div>
      <form method="POST">
        <div>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={handleInputs}
            autoComplete="off"
            placeholder="Your name"
          />
          <input
            type="text"
            name="email"
            id="email"
            value={user.email}
            onChange={handleInputs}
            autoComplete="off"
            placeholder="Your Email"
          />
          <input
            type="number"
            name="phone"
            id="phone"
            value={user.phone}
            onChange={handleInputs}
            autoComplete="off"
            placeholder="Your phone"
          />
          <input
            type="text"
            name="work"
            id="work"
            value={user.work}
            onChange={handleInputs}
            autoComplete="off"
            placeholder="Your work"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleInputs}
            autoComplete="off"
            placeholder="Your Password"
          />
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            value={user.cpassword}
            onChange={handleInputs}
            autoComplete="off"
            placeholder="Confirm Your Password"
          />
          <input
            type="submit"
            name="submit"
            onClick={PostData}
            id="sumbit"
            autoComplete="off"
          />
        </div>
      </form>
    </div>
  );
}

export default Signup;
