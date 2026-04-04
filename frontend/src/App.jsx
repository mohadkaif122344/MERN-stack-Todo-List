import Navbar from './components/Navbar'
import './style/App.css';
import { Route, Routes } from 'react-router-dom';
import AddTask from './components/AddTask';
import { Toaster } from 'react-hot-toast';
import List from './components/List';
import UpdateTask from './components/UpdateTask';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Protected from './components/Protected';

const App = () => {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<Protected><List /></Protected>}/>
        <Route path='/add' element={<Protected><AddTask/></Protected>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/update/:id' element={<Protected>
              <UpdateTask />
            </Protected>}/>
      </Routes>
    </div>
  )
}

export default App