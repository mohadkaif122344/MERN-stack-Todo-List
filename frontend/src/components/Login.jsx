import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { API, setUser } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlelogin = async () => {
    if (!userData.email || !userData.password) {
      toast.error("Please enter email and password");
      return;
    }
    try {
      const { data } = await axios.post(`${API}/api/users/login`, userData, {
        withCredentials: true,
      });

      if (data.success) {
        setUser(data.user);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        onChange={(event) =>
          setUserData({
            ...userData,
            email: event.target.value,
          })
        }
        value={userData.email}
        type="email"
        name="email"
        placeholder="Enter user email"
        required
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        onChange={(event) =>
          setUserData({
            ...userData,
            password: event.target.value,
          })
        }
        value={userData.password}
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
