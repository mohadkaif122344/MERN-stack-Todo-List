import  { useEffect, useState } from 'react';
import '../style/AddTask.css';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTask = () => {

  
    const [taskData, setTaskData] = useState({
  title: "",
  description: ""
});
const navigate = useNavigate();
const {id} = useParams()

useEffect(()=>{
getTask(id)
},[])

const getTask = async(id)=>{
try {
        let list = await fetch("http://localhost:3000/api/todos/task/"+id);
        list = await list.json();
        if (list.success) {
          setTaskData(list.data); 
        }
    } catch (error) {
       toast.error("Error"); 
    }
}

const updateTask= async(id)=>{
    try {
        console.log(taskData);
    let result = await fetch('http://localhost:3000/api/todos/update-task/'+id,{
        method: 'put',
        body:JSON.stringify(taskData),
        headers:{'Content-Type':'Application/Json'}
    })
    result = await result.json()
    if (result) {
        navigate("/")
        toast.success("task updated successfully")
    }
    } catch (error) {
       toast.error("Server error") 
    }
}

  return (
    <div className='container'>
        <h1>Update Task</h1>
        
            <label htmlFor="">Title</label>

            <input value={taskData?.title} onChange={(event) =>setTaskData({...taskData, title:event.target.value})} type="text" name='title' placeholder='Enter Task title'/>

            <label htmlFor="">Description</label>

            <textarea value={taskData?.description} onChange={(event) =>setTaskData({...taskData, description:event.target.value})} name="description" id="" placeholder='Enter Task Description'></textarea>

            <button onClick={()=>updateTask(id)} className='submit'>Update Task</button>
        
    </div>
  )
}

export default UpdateTask