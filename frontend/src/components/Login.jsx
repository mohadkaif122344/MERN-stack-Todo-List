import { useEffect, useState } from 'react'
import '../style/AddTask.css'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = () => {

    const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

    const navigate = useNavigate();

    useEffect(()=>{
        if (localStorage.getItem('token')) {
            navigate('/',{replace: true})
        }
    },[navigate])

    const handlelogin= async ()=>{
    try {
        console.log(userData);
    let result = await fetch('http://localhost:3000/api/users/login',{
        method: 'POST',
        body:JSON.stringify(userData),
        headers:{'Content-Type':'application/json'}
    })
    result = await result.json()
    if (result.success) {
        
        localStorage.setItem('token',result.token)
        navigate("/",{ replace: true })
        toast.success("login successfully")
    }
    } catch (error) {
       toast.error("Server error") 
    }
}

  return (

    <div className='container'>
        <h1>Login</h1>

        <label htmlFor="">Email</label>
        <input
        onChange={(event)=>setUserData({...userData, email:event.target.value})}
        type="email" name='email' placeholder='Enter user email' required/>

        <label htmlFor="">Password</label>
        <input
        onChange={(event)=>setUserData({...userData, password:event.target.value})}
        type="password" name='password' placeholder='Enter user password' required/>

        <button onClick={handlelogin} className='submit'>Login</button>
         <p className="auth-text">
        Don’t have an account?{" "}
        <Link to="/signup" className='link'>
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default Login