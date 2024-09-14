import React, {useContext} from "react"
import Logo from '../img/logo.png'
import { Link } from "react-router-dom"
import EditNoteIcon from '@mui/icons-material/EditNote';
import { AuthContext } from "../context/authContext";

function Header(){
    const {currentUser, logout} = useContext(AuthContext);

    return <div className= "header">
        <div className="container">
            <Link className = "link"to="/"><div className="logo"><img src={Logo}/></div></Link>
            <div className="links">
                <Link className="link" to="/?cat=art"><h6>Art</h6></Link>
                <Link className="link" to="/?cat=science"><h6>Science</h6></Link>
                <Link className="link" to="/?cat=technology"><h6>Technology</h6></Link>
                <Link className="link" to="/?cat=cinema"><h6>Cinema</h6></Link>
                <Link className="link" to="/?cat=design"><h6>Design</h6></Link>
                <Link className="link" to="/?cat=food"><h6>Food</h6></Link>
                <span className="addNewPost">
                    <Link className="link" to="/write"><h6><EditNoteIcon />New Post</h6></Link>
                </span>
                <span><h6>{currentUser?.username}</h6></span>
                {currentUser? <span onClick={logout}>Logout</span>: <Link className="link" to="/login">Login</Link>} 
            
            </div>
    </div>
    <hr />
    </div>
}


export default Header