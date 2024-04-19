import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

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
      
     
        <div style={{ display: "flex", flexDirection: "column", gap:'15px', width:"100%"  }}>
          <h1>All Tasks</h1>

          {!data?<h2>loading....</h2> : data.map((task) => {
           
            // const handleUpdate=(tasks)=>{navigate(`/updatetask/${tasks}`)}
            return (
              <>
              
                <div
                  style={{
                    display: "flex",
                    gap:'10px',
                    flexDirection: "column",
                    border: "2px solid black",
                    borderRadius:'10px',
                    

                }}
                >
                    <div>

                    
                    </div>
                <div>
                  <h5>Title:{task.title.toUpperCase()}</h5>
                </div>
                <div>
                  <h5>Description: {task.body}</h5>
                </div>
                <hr style={{width:'97%',height:'1px',backgroundColor:'rgb(143, 136, 136)'}}/>
                <div style={{ display: "flex", flexDirection: "column",width:"30%",padding:'5px 10px 5px 10px' }}>

                <h6>Assigned To:</h6>
                  {task.assignedTo.map((user) => (
                      <div  style ={{border:"1px solid black",borderRadius:"20px ",padding:'5px 10px 5px 10px ',width:'30%',margin:'10px',backgroundColor:'rgb(27, 24, 24)',color:"white",alignItems:'center'}}key={user._id}>{user.name}</div>
                    ))}
                    </div>
                </div>
               
              </>
            );
          })}
        </div>
        
         </>
                    )
     
                }



export default Home;
