import { useState, useContext } from "react";
import "../style/AddTask.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const { API } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!userData.fullName || !userData.email || !userData.password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const { data } = await axios.post(`${API}/api/users/signup`, userData);
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <label htmlFor="fullName">Name</label>
      <input
        id="fullName"
        onChange={(event) =>
          setUserData({
            ...userData,
            fullName: event.target.value,
          })
        }
        value={userData.fullName}
        type="text"
        name="fullName"
        placeholder="Enter user name"
        required
      />
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
      <button onClick={handleSignup} className="submit">
        Sign up
      </button>
      <p className="auth-text">
        Have an account?{" "}
        <Link to="/login" className="link">
          Login
        </Link>
      </p>
    </div>
  );
};
export default SignUp;
