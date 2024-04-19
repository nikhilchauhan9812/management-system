import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import M from "materialize-css";
import Task from "./task";
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
    <div style={{ display: "flex", flex: "1", gap:'15px',flexDirection: "column", padding:"40px" }}>
      <h1     style={{fontWeight:'bold'}}>My Tasks</h1>
      <p style={{color:'grey',fontSize:'20px'}}>THESE TASK ARE ASSIGNED BY YOU ! </p>


      {mydata.map((task) => {
       
        const handleUpdate=(tasks)=>{navigate(`/updatetask/${tasks}`)}
        return (
          <Task showdelete = {true} key={task._id} tasktitle={task.title} taskbody={task.body} taskassignedTo = {task.assignedTo} />
          
          
        );
      })}
    </div>
    </div>
  )
}

export default Mytask