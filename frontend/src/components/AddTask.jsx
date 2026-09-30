import { useState, useContext } from "react";
import "../style/AddTask.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AddTask = () => {
  const { API,user } = useContext(AuthContext);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddTask = async () => {
    if (!taskData.title || !taskData.description) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/api/todos/add-task`, taskData, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 >Add New Task <span className="username">
        {user?.fullName}</span></h1>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        value={taskData.title}
        onChange={(event) =>
          setTaskData({
            ...taskData,
            title: event.target.value,
          })
        }
        type="text"
        name="title"
        placeholder="Enter Task title"
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={taskData.description}
        onChange={(event) =>
          setTaskData({
            ...taskData,
            description: event.target.value,
          })
        }
        name="description"
        placeholder="Enter Task Description"
      />
      <button onClick={handleAddTask} className="submit" disabled={loading}>
        {loading ? "Adding..." : "Add New Task"}
      </button>
    </div>
  );
};
export default AddTask;
