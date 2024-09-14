import React, {useState, useEffect} from "react";
import axios from "axios";

function Menu({cat}){
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const res = await axios.get(`http://localhost:3000/api/posts?cat=${cat}`);
                setPosts(res.data)
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);

    return (
    <div className="menu">
        <h1>Other posts you may like</h1>
        {posts.map(post => (
            <div className = "post" key={post.id}> 
                <img src={`../upload/${post.img}`} alt="" />
                <h1>{post.title}</h1>
                <p>{post.desc}</p>
                <button>Read More...</button>
            </div>
        ))

        }
    </div>);
}

export default Menu
