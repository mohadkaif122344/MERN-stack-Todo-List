import { useEffect, useState } from 'react'
import '../style/AddTask.css'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const SignUp = () => {

const [userData, setUserData] = useState({
  fullName: "",
  email: "",
  password: ""
})

const navigate = useNavigate();

useEffect(()=>{
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    },[navigate])

    const handleSignup= async()=>{
    try {
        console.log(userData);
    let result = await fetch('http://localhost:3000/api/users/signup',{
        method: "POST",
        body:JSON.stringify(userData),
        headers:{"Content-Type":"application/json"}
    })
    result = await result.json()
    if (result.success) {
        toast.success("signup successfully")
        navigate("/login")
    }else{
        toast.error(result.message);
    }
    } catch (error) {
       toast.error("Server error") 
    }
}

  return (

    <div className='container'>
        <h1>Sign Up</h1>
        <label htmlFor="">Name</label>
        <input onChange={(event)=>setUserData({...userData, fullName:event.target.value})} type="text" name='fullName' placeholder='Enter user name' required/>

        <label htmlFor="">Email</label>
        <input
        onChange={(event)=>setUserData({...userData, email:event.target.value})}
        type="text" name='email' placeholder='Enter user email' required/>

        <label htmlFor="">Password</label>
        <input
        onChange={(event)=>setUserData({...userData, password:event.target.value})}
        type="password" name='password' placeholder='Enter user password' required/>

        <button onClick={handleSignup} className='submit'>Sign up</button>
        <p className="auth-text">
        Have an account?{" "}
        <Link to="/login" className="link">
          Login
        </Link>
      </p>
    </div>
  )
}

export default SignUp