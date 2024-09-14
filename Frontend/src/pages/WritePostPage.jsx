import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import moment from "moment";

function WritePostPage(){
    const state = useLocation().state;
    const [value, setValue] = useState(state?.title || "");
    const [title, setTitle] = useState(state?.desc || "");
    const [img, setImg] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");
    const navigate = useNavigate();
    const handleCatChange = (event) => {
        setCat(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const imgURL = await upload();
        try{
            state ? await axios.put(`http://localhost:3000/api/posts/${state.id}`, {title, desc:value, cat, img:file ? imgURL : ""}, { withCredentials: true }) : await axios.post(`http://localhost:3000/api/posts`, {title, desc:value, cat, img:file ? imgURL : "", date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}, { withCredentials: true });
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }
    const upload = async () => {
        try{
            const formData = new FormData();
            formData.append("file", img);
            const res = await axios.post("http://localhost:3000/api/upload", formData);
            return res.data;
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="write">
            <div className="content">
                <input type="text" value = {title} placeholder="Title" onChange={event => setTitle(event.target.value)}/>
                <div className="editorContainer"><ReactQuill className="editor" theme="snow" value={value} onChange={setValue} /></div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input style={{display: "none"}}type="file" name="" id="file" onChange={event => setImg(event.target.files[0])} />
                    <label className="file" htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleSubmit}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                    <input type="radio"  name="cat" value="art" id="art" onChange={handleCatChange}/>
                    <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "science"} name="cat" value="science" id="science" onChange={handleCatChange}/>
                    <label htmlFor="science">Science</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "technology"} name="cat" value="technology" id="technology" onChange={handleCatChange}/>
                    <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "cinema"} name="cat" value="cinema" id="cinema" onChange={handleCatChange}/>
                    <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "design"} name="cat" value="design" id="design" onChange={handleCatChange}/>
                    <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onChange={handleCatChange}/>
                    <label htmlFor="food">Food</label>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default WritePostPage;