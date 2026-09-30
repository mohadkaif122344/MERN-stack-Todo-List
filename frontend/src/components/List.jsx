import { Fragment, useEffect, useState, useContext } from "react";
import "../style/List.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const List = () => {
  const { API, user } = useContext(AuthContext);

  const [taskData, setTaskData] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [multipleDeleteLoading, setMultipleDeleteLoading] = useState(false);

  const getListData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/api/todos/task`, {
        withCredentials: true,
      });
      if (data.success) {
        setTaskData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListData();
  }, []);

  const deleteTask = async (id) => {
    try {
      setDeleteLoading(true);
      const { data } = await axios.delete(`${API}/api/todos/delete/${id}`, {
        withCredentials: true,
      });
      if (data.success) {
        await getListData();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const selectAll = (event) => {
    if (event.target.checked) {
      const items = taskData.map((item) => item._id);
      setSelectedTask(items);
    } else {
      setSelectedTask([]);
    }
  };

  const selectSingleItem = (id) => {
    if (selectedTask.includes(id)) {
      const items = selectedTask.filter((item) => item !== id);
      setSelectedTask(items);
    } else {
      setSelectedTask([id, ...selectedTask]);
    }
  };

  const deleteMultiple = async () => {
    if (selectedTask.length === 0) {
      toast.error("Please select at least one task");
      return;
    }
    try {
      setMultipleDeleteLoading(true);
      const { data } = await axios.delete(`${API}/api/todos/delete-multiple`, {
        data: {
          ids: selectedTask,
        },
        withCredentials: true,
      });
      if (data.success) {
        setSelectedTask([]);
        await getListData();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setMultipleDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="list-container">
        <h1 className="title">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h1 className="title">Email:
        <span className="email">{user?.email}</span></h1>

      <button
        onClick={deleteMultiple}
        className="delete-item delete-multiple"
        disabled={multipleDeleteLoading || selectedTask.length === 0}
      >
        {multipleDeleteLoading ? "Deleting..." : "Delete"}
      </button>
      <ul className="task-list">
        <li className="list-header">
          <input
            onChange={selectAll}
            type="checkbox"
            checked={
              taskData.length > 0 && selectedTask.length === taskData.length
            }
          />
        </li>
        <li className="list-header">S.No</li>
        <li className="list-header">Title</li>
        <li className="list-header">Description</li>
        <li className="list-header">Action</li>
        {taskData.length > 0 ? (
          taskData.map((item, index) => (
            <Fragment key={item._id}>
              <li className="list-item">
                <input
                  onChange={() => selectSingleItem(item._id)}
                  checked={selectedTask.includes(item._id)}
                  type="checkbox"
                />
              </li>
              <li className="list-item">{index + 1}</li>
              <li className="list-item">{item.title}</li>
              <li className="list-item">{item.description}</li>
              <li className="list-item">
                <button
                  onClick={() => deleteTask(item._id)}
                  className="delete-item"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
                <Link to={`/update/${item._id}`} className="update-item">
                  Update
                </Link>
              </li>
            </Fragment>
          ))
        ) : (
          <li className="list-item">No tasks found</li>
        )}
      </ul>
    </div>
  );
};
export default List;
