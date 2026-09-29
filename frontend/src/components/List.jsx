import { Fragment, useEffect, useState } from "react";
import "../style/List.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const List = () => {
  const { API} = useContext(AuthContext);

  const [taskData, setTaskData] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);

  const getListData = async () => {
    try {
      const { data } = await axios.get(`${API}/api/todos/task`);
      if (data) {
        setTaskData(data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getListData();
  }, []);

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/api/todos/delete/${id}`);
      if (data) {
        getListData();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const selectAll = (event) => {
    if (event.target.checked) {
      let items = taskData.map((item) => item._id);
      setSelectedTask(items);
    } else {
      setSelectedTask([]);
    }
  };

  const selectSingleItem = (id) => {
    if (selectedTask.includes(id)) {
      let items = selectedTask.filter((item) => item != id);
      setSelectedTask(items);
    } else {
      setSelectedTask([id, ...selectedTask]);
    }
  };

  const deleteMultiple = async () => {
    try {
      const { data } = await axios.delete(`${API}/api/todos/delete-multiple/`, {
        data: {
          ids: selectedTask,
        },
      });
      if (data) {
        getListData();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="list-container">
      <h1 className="title">To Do List</h1>
      <button onClick={deleteMultiple} className="delete-item delete-multiple">
        Delete
      </button>
      <ul className="task-list">
        <li className="list-header">
          <input onChange={selectAll} type="checkbox" />
        </li>
        <li className="list-header">S.No</li>
        <li className="list-header">Title</li>
        <li className="list-header">Description</li>
        <li className="list-header">Action</li>
        {taskData &&
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
                >
                  Delete
                </button>
                <Link to={"update/" + item._id} className="update-item">
                  Update
                </Link>
              </li>
            </Fragment>
          ))}
      </ul>
    </div>
  );
};

export default List;
