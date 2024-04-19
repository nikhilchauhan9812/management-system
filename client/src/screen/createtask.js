import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import Button from '@mui/material/Button';
const Createtask = () => {
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [assignedTo,setAssignedTo]=useState([""])
    const navigate = useNavigate();
    const postdata=()=>{
        fetch('/createtask',{
  method:"post",
  headers:{
    "Content-Type":"application/json",
    Authorization:"bearer "+localStorage.getItem("jwt")
  },
  body:JSON.stringify({
    title,
    body:description,
    assignedTo
})}).then(res=>{
    return res.json()}).then(data=>{
        if(data.error){
            M.toast({ html:data.error, classes: "#c62828 red darken-3" });
            console.log(data.error)
    }else{  
        M.toast({html:"saved successfully",classes:"#43a047 green darken-1"})
        navigate('/')
    }}).catch(err=>{
        console.log(err)
    })
    }
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh,border:'2px'",
    }}
  >
   
    <form className="login-form">
      <h2 style={{ textAlign: "center" }}>Create Task</h2>
    
      <div class="input-field col s6">
        <input id="last_name" type="text" class="validate" onChange={(e) => setTitle(e.target.value)}/>
        <label for="last_name">title</label>
      </div>
      <div class="input-field col s6">
        <input id="last_name" type="text" class="validate" onChange={(e) => setDescription(e.target.value)}/>
        <label for="last_name">description</label>
      </div>
      <div class="input-field col s6">
        <input id="last_name" type="text" class="validate" onChange={(e) => setAssignedTo(e.target.value)} />
        <label for="last_name">Assigned To</label>
      </div>
     
      <Button onClick={() => postdata()} variant="contained">
        Create
      </Button>
    
    </form>
  </div>
  )
}

export default Createtask