import { useEffect, useState } from "react";
import "../style/AddTask.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const { API } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSignup = async () => {
    try {
      const { data } = await axios.post(`${API}/api/users/signup`, {
        userData,
      });
      if (data) {
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
      <label htmlFor="">Name</label>
      <input
        onChange={(event) =>
          setUserData({ ...userData, fullName: event.target.value })
        }
        type="text"
        name="fullName"
        placeholder="Enter user name"
        required
      />
      <label htmlFor="">Email</label>
      <input
        onChange={(event) =>
          setUserData({ ...userData, email: event.target.value })
        }
        type="text"
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
