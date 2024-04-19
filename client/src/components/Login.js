import React, { useState } from "react";
import Button from "@mui/material/Button";
import M from "materialize-css";

import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
   const postdata = () => {
    if(!email || !password){
      return M.toast({html: "please enter all fields",classes:"#c62828 red darken-3"})
    }
    if (
      
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Please enter valid email and password", classes: "#c62828 red darken-3" });
      
      return console.log("invalid email");
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.token);
        if (data.error) {
          M.toast({ html:data.error, classes: "#c62828 red darken-3" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user",JSON.stringify(data.user))
          // dispatch({type:"USER",payload:data.user})
          M.toast({ html:"successfully Signed in", classes: "#43a047 green darken-1" });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh,border:'2px'",
      }}
    >
     
      <form className="login-form">
        <h1 style={{ textAlign: "center" }}>Welcome Back!</h1>
      
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate" onChange={(e) => setEmail(e.target.value)}/>
          <label for="last_name">Email</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="password" class="validate" onChange={(e) => setPassword(e.target.value)} />
          <label for="last_name">Password</label>
        </div>
       
        <Button onClick={() => postdata()} variant="contained">
          Login
        </Button>
        <p>
          Don't have an account?<Link to="/signup">signup</Link>
        </p>
      </form>
    </div>
  );
}
