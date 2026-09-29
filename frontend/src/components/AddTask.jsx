import { useState } from "react";
import "../style/AddTask.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AddTask = () => {
  const { API } = useContext(AuthContext);
  const [taskData, setTaskData] = useState();
  const navigate = useNavigate();

  const handleAddTask = async () => {
    try {
      const { data } = await axios.post(`${API}/api/todos/add-task`, taskData);
      if (data) {
        navigate("/");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Add New Task</h1>
      <label htmlFor="">Title</label>
      <input
        onChange={(event) =>
          setTaskData({ ...taskData, title: event.target.value })
        }
        type="text"
        name="title"
        placeholder="Enter Task title"
      />
      <label htmlFor="">Description</label>
      <textarea
        onChange={(event) =>
          setTaskData({ ...taskData, description: event.target.value })
        }
        name="description"
        id=""
        placeholder="Enter Task Description"
      ></textarea>
      <button onClick={handleAddTask} className="submit">
        Add New Task
      </button>
    </div>
  );
};

export default AddTask;
