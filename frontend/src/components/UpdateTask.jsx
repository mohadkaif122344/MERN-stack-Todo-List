import { useEffect, useState, useContext } from "react";
import "../style/AddTask.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const UpdateTask = () => {
  const { API, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getTask(id);
  }, [id]);

  const getTask = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/api/todos/task/${id}`, {
        withCredentials: true,
      });
      if (data.success) {
        setTaskData({
          title: data.data?.title || "",
          description: data.data?.description || "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.messsage);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id) => {
    if (!taskData.title || !taskData.description) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setUpdateLoading(true);
      const { data } = await axios.put(
        `${API}/api/todos/update-task/${id}`,
        taskData,
        {
          withCredentials: true,
        },
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <h1>Update Task <span className="username">
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
      <button
        onClick={() => updateTask(id)}
        className="submit"
        disabled={updateLoading}
      >
        {updateLoading ? "Updating..." : "Update Task"}
      </button>
    </div>
  );
};
export default UpdateTask;
