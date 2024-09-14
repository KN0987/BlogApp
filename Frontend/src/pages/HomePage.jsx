import React, {useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import axios from "axios";

function HomePage(){

    const [posts,setPosts] = useState([]);
    const cat = useLocation().search;
    
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const res = await axios.get(`http://localhost:3000/api/posts${cat}`);
                setPosts(res.data)
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    }
    return(
        <div className="home">
            <div className="posts">
              {
                posts.map(post => 
                    (<>
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../upload/${post.img}`} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                            <h3>{post.title}</h3>
                            </Link>
                            <p>{getText(post.desc)}</p>
                            <Link className="link" to={`/post/${post.id}`}>
                            <button>Read more<UnfoldMoreIcon /></button>
                            </Link>
                        </div>
                        
                    </div>
                    <hr />
                    </>))
                }  
            </div>
        </div>
    )
};



export default HomePage