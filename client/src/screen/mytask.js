import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import M from "materialize-css";
import Delete from "./delete";
const Mytask = () => {
    const [mydata, setMyData] = useState([]);
    const navigate=useNavigate()

   useEffect(()=>{

      
           fetch("/mytask", {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "bearer " + localStorage.getItem("jwt"),
                },
              })
              .then((res) => {
                return res.json();
              })
              .then((result) => {
                console.log("in mytask", result.mytask);
                setMyData(result.mytask);
              })
              .catch((err) => {
                console.log(err, "in mytask");
            });
        
    })
        return (
    <div style={{ display: "flex" }}>
    <div style={{ display: "flex", flex: "1", flexDirection: "column" }}>
      <h1>My Tasks</h1>
      <p style={{color:'grey',fontSize:'20px'}}>THESE TASK ARE ASSIGNED BY YOU ! </p>


      {mydata.map((task) => {
       
        const handleUpdate=(tasks)=>{navigate(`/updatetask/${tasks}`)}
        return (
          <>
          
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid black",
                borderRadius:'20px',
               

            }}
            >
                <div style={{display:'flex' ,justifyContent:'flex-end',margin:'20px',gap:'20px'}}>

                <p onClick={()=>handleUpdate(task._id)} style={{cursor:'pointer',color:'blue'}} >want to update?</p>
                <Delete taskid={task._id}/>
                </div>
            <div>
              <h5>Title:{task.title.toUpperCase()}</h5>
            </div>
            <div>
              <h3>Description:{task.body}</h3>
            </div>
            <hr style={{width:'97%',height:'1px',backgroundColor:'rgb(143, 136, 136)'}}/>
            <div style={{ display: "flex", flexDirection: "column",width:"30%",padding:'5px 10px 5px 10px' }}>

            <h6>Assigned To:</h6>
              {task.assignedTo.map((user) => (
                  <div  style ={{border:"1px solid black",borderRadius:"20px ",padding:'5px 10px 5px 10px ',width:'auto',margin:'10px',backgroundColor:'rgb(27, 24, 24)',color:"white",alignItems:'center'}}key={user._id}>{user.name}</div>
                ))}
                </div>
            </div>
           
          </>
        );
      })}
    </div>
    </div>
  )
}

export default Mytask