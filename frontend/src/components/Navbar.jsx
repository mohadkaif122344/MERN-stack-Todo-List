import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/navbar.css';
import toast from 'react-hot-toast';

const Navbar = () => {

 const navigate = useNavigate();
 const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("token");

      toast.success("Logout successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className='navbar'>
        <div className='logo'>To Do App</div>
       
        <ul className='nav-links'>
             <li><Link to="/" className='list'>List</Link></li>
            <li><Link to="/add" className='add-task'>Add Task</Link></li>
             {token && (
            <li ><Link onClick={handleLogout} className='logout'>Logout</Link> 
          </li>
          )}
        </ul>
       
    </nav>
  )
}

export default Navbar