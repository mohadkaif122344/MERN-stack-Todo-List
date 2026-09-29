import { useEffect, useState } from "react";
import "../style/AddTask.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const UpdateTask = () => {
  const { API } = useContext(AuthContext);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getTask(id);
  }, []);

  const getTask = async (id) => {
    try {
      const { data } = await axios.get(`${API}/api/todos/task/${id}`);
      if (data) {
        setTaskData({
          title: data.data?.title || "",
          description: data.data?.description || "",
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateTask = async (id) => {
    try {
      const { data } = await axios.put(
        `${API}/api/todos/update-task/${id}`,
        taskData,
      );
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
      <h1>Update Task</h1>
      <label htmlFor="">Title</label>
      <input
        value={taskData?.title}
        onChange={(event) =>
          setTaskData({ ...taskData, title: event.target.value })
        }
        type="text"
        name="title"
        placeholder="Enter Task title"
      />
      <label htmlFor="">Description</label>
      <textarea
        value={taskData?.description}
        onChange={(event) =>
          setTaskData({ ...taskData, description: event.target.value })
        }
        name="description"
        id=""
        placeholder="Enter Task Description"
      ></textarea>
      <button onClick={() => updateTask(id)} className="submit">
        Update Task
      </button>
    </div>
  );
};

export default UpdateTask;
