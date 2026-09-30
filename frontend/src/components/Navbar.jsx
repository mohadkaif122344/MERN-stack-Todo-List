import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { API, user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`${API}/api/users/logout`, {
        withCredentials: true,
      });
      setUser(null);
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">To Do App</div>
      <ul className="nav-links">
        <Link to="/" className="list">
          List
        </Link>
        <Link to="/add" className="add-task">
          Add Task
        </Link>
        {user && (
          <button onClick={handleLogout} className="logout">
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
