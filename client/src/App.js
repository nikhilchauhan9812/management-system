
import './App.css';
import { useEffect } from 'react';
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import Login from './components/Login';
import Createtask from './screen/createtask';
import Signup from './components/Signup';
import Home from './screen/home';
import Navbar from './components/Navbar';
import Router from './components/router';
import Updatetask from './screen/updatetask';
import Mytask from './screen/mytask';
import Assignedtask from './screen/assignedtask';
function App() {
  const user=JSON.parse(localStorage.getItem("user"))
  
  const Routing = () => {
    const navigate=useNavigate()
    
    useEffect(()=>{
      if(user){
        navigate('/')
       
      }else{
        navigate('/login')
      }
    },[user])
    
   
    return(
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/login' element={<Login/>} />
  <Route path='/signup' element={<Signup/>} />
  <Route path='/createtask' element={<Createtask/>}/>
  <Route path='/updatetask/:taskid' element={<Updatetask/>}/>
  <Route  path='/mytask' element={<Mytask/>}  />
  <Route path='/assignedtask' element={<Assignedtask/>}/>

  </Routes>
    )}

  return (
   

<BrowserRouter>
<Navbar/>

 <Router /> 
<Routing />
  </BrowserRouter>
   
  );
}

export default App;
