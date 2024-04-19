import React,{useState}  from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import Button from '@mui/material/Button';

function Updatetask() {

    const [title,setTitle]=useState('')
    const[description, setDescription] = useState("")   
    const [assignedTo,setAssignedTo]=useState([])
const {taskid}=useParams()

    const navigate = useNavigate();

    const postdata=()=>{
        if(!title || !description||!assignedTo){
            return M.toast({html: "please enter all fields",classes:"#c62828 red darken-3"})
          }

       fetch(`/updatetask/${taskid}`,{
           method:"patch",
           headers:{
               "Content-Type":"application/json",
               Authorization:"bearer "+localStorage.getItem("jwt")
           },
           body:JSON.stringify({
            title,
            body:description,
            assignedTo
           })
       }).then(res=>res.json()).then(data=>{
           if(data.error){
               M.toast({html:data.error,classes:"#c62828 red darken-3"})
           }else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               navigate('/')
           }
       }).catch(err=>{console.log(err)})
   
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
      <h2 style={{ textAlign: "center" }}>Update Task</h2>
    
      <div class="input-field col s6">
        <input id="last_name" type="text" class="validate" onChange={(e) => setTitle(e.target.value)}/>
        <label for="last_name">New title</label>
      </div>
      <div class="input-field col s6">
        <input id="last_name" type="text" class="validate" onChange={(e) => setDescription(e.target.value)}/>
        <label for="last_name">New description</label>
      </div>
      <div class="input-field col s6">
        <input id="last_name" type="text" class="validate" onChange={(e) => setAssignedTo(e.target.value)} />
        <label for="last_name">New Assigned To</label>
      </div>
     
      <Button onClick={() => postdata()} variant="contained">
        Update
      </Button>
    
    </form>
  </div>

  )
}

export default Updatetask