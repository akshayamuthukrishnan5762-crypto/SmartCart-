import { useState } from "react";
import axios from "axios";
import "./Login.css";
import{Link} from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      alert("Login Successful");
     
      localStorage.setItem(
        "token",
        res.data.token
      );
      localStorage.setItem(
        "email",
        email
      );
      localStorage.setItem(
        "name",
        res.data.user.name
      );

        localStorage.setItem(
        "role",
        res.data.user.role
      );
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back 👋</h1>

        <p>Login to continue shopping</p>

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <div className="login-options">
          <label>
            <input type="checkbox" />
            Remember Me
          </label>

          <a
  href="#"
  onClick={() =>
    alert(
      "Forgot Password feature coming soon"
    )
  }
>
  Forgot Password?
</a>
        </div>

        <button onClick={handleLogin}>
          Login
        </button>

        <p className="register">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;