import React from 'react'
import Delete from './delete'
const Task = ( props) => {
    const handleUpdate=()=>{
      
    }
  return (
    
    <div
    style={{
      display: "flex",
      gap:'10px',
      flexDirection: "column",
      border: "2px solid black",
      borderRadius:'10px',
      padding:'10px',
      backgroundColor:"antiquewhite"

  }}
  >
   {props.showdelete? <div style={{display:'flex' ,justifyContent:'flex-end',margin:'20px',gap:'20px'}}>

<p onClick={()=>handleUpdate(props.taskid)} style={{cursor:'pointer',color:'blue'}} >want to update?</p>
<Delete taskid={props.taskid}/>
</div>
:null}
      
  <div>
    <h5><span style={{fontWeight:'bold',fontSize:'27px',fontFamily:'-moz-initial'}}>TITLE</span>:{props.tasktitle.toUpperCase()}</h5>
  </div>
  <div>
    <h5><span style={{fontWeight:'bold',fontSize:'27px',fontFamily:'-moz-initial'}}>DESCRIPTION</span>: {props.taskbody}</h5>
  </div>
  <hr style={{width:'97%',height:'1px',backgroundColor:'rgb(143, 136, 136)'}}/>
  <div style={{ display: "flex", flexDirection: "column",width:"30%",padding:'5px 10px 5px 10px' }}>

  <h6>Assigned To:</h6>
    {props.taskassignedTo.map((user) => (
        <div  style ={{border:"1px solid black",borderRadius:"20px ",padding:'5px 10px 5px 10px ',width:'30%',margin:'10px',backgroundColor:'rgb(27, 24, 24)',color:"white",alignItems:'center'}}key={user._id}>{user.name}</div>
      ))}
      </div>
  </div>
  )
}

export default Task