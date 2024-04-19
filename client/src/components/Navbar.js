import { useNavigate } from 'react-router-dom';
export default function Navbar() {
const Navigate=useNavigate()
const user=JSON.parse(localStorage.getItem("user"))
    const handleSignout = () => {

        localStorage.clear();
        Navigate('/login')
    }
    return (
        <nav style={{backgroundColor:"black",height:'5%'}}>
          {!user ?  <h2 style={{marginRight:"20%",color:'White',}}>Online Task Management System</h2>:null }
            {user ?<h4 style={{fontSize:"20px", color:'black',textAlign:'center',marginRight:'20px'}}>Hi, <span style={{color:"golden"}}>{user.name}</span></h4>:null}
            
          { user ? <button className="signout-btn" onClick={handleSignout}>SignOut</button> :null }
        </nav>
    )
}