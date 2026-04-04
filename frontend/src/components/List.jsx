import { Fragment, useEffect, useState } from "react";
import "../style/List.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const List = () => {
  const [taskData, setTaskData] = useState([]);
  const [selectedTask, setSelectedTask] = useState([])
  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    try {
        let list = await fetch("http://localhost:3000/api/todos/task");
        list = await list.json();
        if (list.success) {
          setTaskData(list.data);
        }
    } catch (error) {
       toast.error("Error"); 
    }
  };

  const deleteTask = async(id)=>{
    try {
        let list = await fetch("http://localhost:3000/api/todos/delete/"+id,{method:'delete'});
        list = await list.json();
        if (list.success) {
            getListData();
          toast.success("item delete successfully");
        }
    } catch (error) {
        toast.error("Something went wrong");
    }
  }

  const selectAll = (event) => {
    if (event.target.checked) {
        let items = taskData.map((item)=>item._id);
         setSelectedTask(items)
    }else{
        setSelectedTask([])
    }
  }

  const selectSingleItem=(id)=>{
    console.log(id);
    if (selectedTask.includes(id)) {
        let items = selectedTask.filter((item)=>item!=id);
        setSelectedTask(items)
    }else{
        setSelectedTask([id,...selectedTask])
    }
  }

const deleteMultiple = async()=>{
   try {
    console.log(selectedTask);
        let list = await fetch("http://localhost:3000/api/todos/delete-multiple/",
            {method:'delete',
body:JSON.stringify({ids:selectedTask}),
        headers:{'Content-Type':'Application/Json'}
            });
        list = await list.json();
        if (list.success) {
            getListData();
          toast.success("item delete successfully");
        }
    } catch (error) {
        toast.error("Something went wrong");
    } 
}

  return (
    <div className="list-container">
      <h1>To Do List</h1>
      <button onClick={deleteMultiple}  className="delete-item delete-multiple">Delete</button>
      <ul className="task-list">

        <li className="list-header"><input onChange={selectAll} type="checkbox" /></li>
        <li className="list-header">S.No</li>
        <li className="list-header">Title</li>
        <li className="list-header">Description</li>
        <li className="list-header">Action</li>

        {taskData &&
          taskData.map((item, index) => (
            <Fragment key={item._id}>
              <li className="list-item"><input onChange={()=>selectSingleItem(item._id)} checked={selectedTask.includes(item._id)}  type="checkbox" /></li>
              <li className="list-item">{index + 1}</li>
              <li className="list-item">{item.title}</li>
              <li className="list-item">{item.description}</li>
              <li className="list-item">
                <button onClick={()=>deleteTask(item._id)} className="delete-item">
                  Delete
                </button>
              <Link to={"update/"+item._id} className="update-item">Update</Link>
              </li>
            </Fragment>
          ))}
      </ul>
    </div>
  );
};

export default List;
