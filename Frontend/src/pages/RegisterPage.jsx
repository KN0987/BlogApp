import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";



function RegisterPage(){
    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password: "",
    });

    const [err, setError] = useState(null);

    const handleChange = (event) =>{
        const {value, name} = event.target;
        setInputs(prev =>  {
            return {
                ...prev, 
                [name]: value
            };
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setInputs({
            username: "",
            email: "",
            password: "",
        });
        try{
            await axios.post("http://localhost:3000/api/auth/register", inputs);
            setError("User has been created!");
        }catch(err){
            setError(err.response.data);
        }
    }
    return(
        <div className='auth'>
            <h1>Register</h1>
            <form>
                <input required type="text" placeholder="username" name="username" onChange={handleChange} />
                <input required type="email" placeholder="email" name="email" onChange={handleChange} />
                <input required type="password" placeholder="password" name="password" onChange={handleChange} />
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}</p>}
                <span>Back to <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
};

export default RegisterPage