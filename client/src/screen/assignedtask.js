import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import M from "materialize-css";
import Task from "./task";
import Delete from "./delete";
const Assignedtask = () => {
    const [mydata, setMyData] = useState([]);
    const navigate=useNavigate()

   useEffect(()=>{

      
    fetch("/assignedtask", {
        headers: {
          Authorization: "bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          console.log(result.assignedtask);
          setMyData(result.assignedtask);
        })
        .catch((err) => {
          console.log(err);
        });
        
    })
        return (
    <div style={{ display: "flex" }}>
    <div style={{ display: "flex", flex: "1",gap:'15px', flexDirection: "column",padding:"40px" }}>
      <h1     style={{fontWeight:'bold'}}>Assigned Tasks</h1>
      <p style={{color:'grey',fontSize:'20px'}}>THESE TASK ARE ASSIGNED TO YOU ! PLEASE DO IT ON PRIORITY! </p>

      {mydata.map((task) => {
       
        const handleUpdate=(tasks)=>{navigate(`/updatetask/${tasks}`)}
        return (
          <Task  showdelete = {false} key={task._id} tasktitle={task.title} taskbody={task.body} taskassignedTo = {task.assignedTo} />
          
            
        );
      })}
    </div>
    </div>
  )
}

export default Assignedtask