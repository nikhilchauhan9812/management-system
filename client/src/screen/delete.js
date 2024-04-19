import { useEffect } from "react";
import M from "materialize-css";
import { useNavigate } from 'react-router-dom'

const Delete=(props)=>{
    const navigate=useNavigate()
    const deletetask=()=>{
      
       if(window.confirm("Are you sure you want to delete this task?")){
            
            fetch(`/deletetask/${props.taskid}`,{
                method:"delete",
                headers:{
                    Authorization:"bearer "+localStorage.getItem("jwt")
                }
            }).then(res=>res.json()).then(data=>{
                if (data.error) {
                    M.toast({ html:data.error, classes: "#c62828 red darken-3" });
                    
                }else{
                    M.toast({ html:"Successfully deleted", classes: "#c62828 green darken-3" });
                    navigate('/mytask')
                    
                }
            }).catch(err=>{
                console.log(err)
            })
        }
        }
        return (
        // <button onClick={() => {console.log(props.taskid)}}>delete</button>
        <button className='delete-btn' onClick={()=>{deletetask()}}><i class="small material-icons">delete</i></button>
    )
}
export default Delete