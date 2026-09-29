import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { API, setUser} = useContext(AuthContext);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlelogin = async () => {
    try {
      const { data } = await axios.post(`${API}/api/users/login`, userData);
      if (data) {
        localStorage.setItem("token", data.token);
          setUser(data.user);
        navigate("/");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container">
      <h1>Login</h1>

      <label htmlFor="">Email</label>
      <input
        onChange={(event) =>
          setUserData({ ...userData, email: event.target.value })
        }
        type="email"
        name="email"
        placeholder="Enter user email"
        required
      />
      <label htmlFor="">Password</label>
      <input
        onChange={(event) =>
          setUserData({ ...userData, password: event.target.value })
        }
        type="password"
        name="password"
        placeholder="Enter user password"
        required
      />
      <button onClick={handlelogin} className="submit">
        Login
      </button>
      <p className="auth-text">
        Don’t have an account?{" "}
        <Link to="/signup" className="link">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
