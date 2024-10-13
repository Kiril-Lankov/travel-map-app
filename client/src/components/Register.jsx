import { useRef, useState } from "react";
import "./register.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

export default function Register({setShowRegister}) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
e.preventDefault();
const newUser = {
    username: nameRef.current.value,
    email: emailRef.current.value,
    password: passwordRef.current.value,
};

try {
  await axios.post("/api/users/register", newUser);
  setError(false)
  setSuccess(true)
} catch (error) {
    console.log(error)
}
    }
    return (
        <div className="registerContainer">
            <div className="logo">
                <LocationOnIcon/>
                KiToPin
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" ref={nameRef}/>
                    <input type="email" placeholder="email" ref={emailRef} />
                    <input type="password" placeholder="password" ref={passwordRef}/>
                    <button className="registerBtn">Register</button>
                    {success &&
                    <span className="success">Successful.You can login now!</span>}
                    {error &&
                    <span className="failure">Something went wrong!</span>}
                </form>   
                <CancelIcon className="cancelRegister" onClick={()=>setShowRegister(false)}/>
            </div>
        
    )
}