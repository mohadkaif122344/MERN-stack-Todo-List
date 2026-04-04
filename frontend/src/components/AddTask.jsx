import  { useState } from 'react';
import '../style/AddTask.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {

    const [taskData, setTaskData] = useState();
const navigate = useNavigate();

const handleAddTask= async()=>{
    try {
        console.log(taskData);
    let result = await fetch('http://localhost:3000/api/todos/add-task',{
        method: 'Post',
        body:JSON.stringify(taskData),
        headers:{'Content-Type':'Application/Json'}
    })
    result = await result.json()
    if (result) {
        navigate("/")
        toast.success("New task added successfully")

    }
    } catch (error) {
       toast.error("Server error") 
    }
}

  return (
    <div className='container'>
        <h1>Add New Task</h1>
        
            <label htmlFor="">Title</label>

            <input onChange={(event) =>setTaskData({...taskData, title:event.target.value})} type="text" name='title' placeholder='Enter Task title'/>

            <label htmlFor="">Description</label>

            <textarea onChange={(event) =>setTaskData({...taskData, description:event.target.value})} name="description" id="" placeholder='Enter Task Description'></textarea>

            <button onClick={handleAddTask} className='submit'>Add New Task</button>
        
    </div>
  )
}

export default AddTask