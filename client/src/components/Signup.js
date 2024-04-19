import React ,{useState}from 'react'
import Button from '@mui/material/Button';
import M from "materialize-css";
import { Link,useNavigate } from 'react-router-dom';

function Signup() {
const navigate =  useNavigate()
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const postdata=()=>{
    if(!email || !password || !name){
      return M.toast({html: "please enter all fields",classes:"#c62828 red darken-3"})
    }


  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
    return
  }
  fetch('/signup',{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,
      email,
      password
    })
  }).then(res =>res.json()).then(data=>{
    if(data.error){
      M.toast({html: data.error,classes:"#c62828 red darken-3"})
    }else{  
      M.toast({html: data.message,classes:"#43a047 green darken-1"})
    navigate('/login')
    }
  }).catch(err=>{
    console.log(err)
  })
}
  return (
<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh,border:'2px'"}}>

    <form className='login-form'>
    <h1 style={{textAlign:"center"}}>Welcome User!</h1>
    <div class="input-field col s6">
          <input id="last_name" type="text" class="validate" onChange={(e) => setName(e.target.value)}/>
          <label for="last_name">Username</label>
          </div>
          <div class="input-field col s6">
          <input id="last_name" type="text" class="validate" onChange={(e) => setEmail(e.target.value)}/>
          <label for="last_name">Email</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="password" class="validate" onChange={(e) => setPassword(e.target.value)} />
          <label for="last_name">Password</label>
        </div>
       <Button onClick={()=>postdata()} variant="contained">Signup</Button>
<p>Already have an account?<Link to='/login'>Login</Link></p>
    </form>
</div>
    
  )
}

export default Signup