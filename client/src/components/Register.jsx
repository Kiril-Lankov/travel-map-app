import "./register.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Register() {
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
                    <span className="success">Successful.You can login now!</span>
                    <span className="failure">Something went wrong!</span>
                </form>   
            </div>
        
    )
}