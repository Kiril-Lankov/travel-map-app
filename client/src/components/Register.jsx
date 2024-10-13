import { useState } from "react";
import "./register.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Register() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    return (
        <div className="registerContainer">
            <div className="logo">
                <LocationOnIcon/>
                KiToPin
                </div>
                <form>
                    <input type="text" placeholder="username"/>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button className="registerBtn">Register</button>
                    {success &&
                    <span className="success">Successful.You can login now!</span>}
                    {error &&
                    <span className="failure">Something went wrong!</span>}
                </form>   
            </div>
        
    )
}