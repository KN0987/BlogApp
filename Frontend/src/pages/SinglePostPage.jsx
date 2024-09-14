import React, {useState, useEffect, useContext} from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import {AuthContext} from "../context/authContext.jsx";

function SinglePostPage(){
    const [post,setPost] = useState({});
    const location = useLocation();
    const postId = location.pathname.split("/")[2];
    const navigate = useNavigate();

    const {currentUser} = useContext(AuthContext);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const res = await axios.get(`http://localhost:3000/api/posts/${postId}`);
                setPost(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    }, [postId]);

    const handleDelete = async () => {
        try{
            await axios.delete(`http://localhost:3000/api/posts/${postId}`, {withCredentials: true});
            navigate("/")
        }catch(err){
            console.log(err);
        }
    }
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    }
    return(
        <div className='single'>
            
            <div className="content">
                
                <img src={`../upload/${post.img}`}/>
                <div className ="user">
                    {post.userImage ? <img src={post.userImage} /> : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"/> }
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser.username === post.username && <div className="edit">
                        <Link className="link" to={`/write?edit=2`} state={post}>
                            <EditIcon />
                        </Link>
                        <Link className="link">
                            <span onClick={handleDelete}><DeleteIcon /></span>
                        </Link>
                    </div>}
                </div>
                <h2>{post.title}</h2>
                <p>{getText(post.desc)}</p>
            </div>
            <Menu cat={post.cat}/>
        </div>
    )
};

export default SinglePostPage