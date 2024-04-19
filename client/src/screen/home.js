import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Task from "./task";

function Home() {
  const [data, setData] = useState([]);
  const [mydata, setMyData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/alltask", {
      headers: {
        Authorization: "bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        return res.json(); // Ensure to return parsed JSON here
      })
      .then((result) => {
        console.log(result.tasks);
        setData(result.tasks);
      })
      .catch((err) => console.error("Error fetching data:", err));

   
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
  }, []);

  return(
        <>
      
     
        <div style={{ display: "flex", flexDirection: "column", gap:'15px', width:"100%" ,padding:"40px" }}>
          <h1          style={{fontWeight:'bold'}}>All Tasks</h1>

          {!data?<h2>loading....</h2> : data.map((task) => {
           
          
            return (
              <>
              
                <Task showdelete = {false} taskid={task._id} tasktitle={task.title} taskbody={task.body} taskassignedTo = {task.assignedTo} />
               
              </>
            );
          })}
        </div>
        
         </>
                    )
     
                }



export default Home;
