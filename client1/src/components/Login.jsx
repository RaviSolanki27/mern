import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const loginuser = async (e) => {
    e.preventDefault();
    console.log("User responce",e);
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log("login Working", res);

    const data = await res.json();
    console.log("login data", data);

    if (res.status === 400 || !data) {
      window.alert("Invalid Details");
      console.log("INHUSBCB");
    } else {
      window.alert("Login Successfull");

      console.log("VALID");

      navigate("/");
    }
  };

  return (
    <div>
      <form method="POST">
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="off"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          autoComplete="off"
          placeholder="Your Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <input
          type="submit"
          name="login"
          value="login"
          id="login"
          autoComplete="off"
          onClick={loginuser}
        />
      </form>
    </div>
  );
}

export default Login;
