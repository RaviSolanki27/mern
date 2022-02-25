import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const [userdata, setUserdata] = useState("");

  const callAboutpage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      console.log("Userdata in about RES", res);
      const data = await res.json();
      console.log("Userdata in about", data);
      setUserdata(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  console.log("userdata", userdata);
  useEffect(() => {
    callAboutpage();
  },[]);

  return (
    <div>
      ABOUT
      <form method="GET">
        <p>name - {userdata.name}</p>
        <p>email - {userdata.email}</p>
        <p>phone - {userdata.phone}</p>
      </form>
    </div>
  );
}

export default About;
