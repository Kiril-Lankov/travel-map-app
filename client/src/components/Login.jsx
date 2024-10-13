import { useRef, useState } from "react";
import "./login.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

export default function Login({setShowLogin}) {
    const [error, setError] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
e.preventDefault();
const newUser = {
    username: nameRef.current.value,
    password: passwordRef.current.value,
};

try {
  await axios.post("/api/users/register", newUser);
  setError(false)
} catch (error) {
    console.log(error)
}
    }
    return (
        <div className="loginContainer">
            <div className="logo">
                <LocationOnIcon/>
                KiToPin
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" ref={nameRef}/>
                    <input type="password" placeholder="password" ref={passwordRef}/>
                    <button className="loginBtn">Login</button>
                    {error &&
                    <span className="failure">Something went wrong!</span>}
                </form>   
                <CancelIcon className="cancelLogin" onClick={()=>setShowLogin(false)}/>
            </div>
        
    )
}