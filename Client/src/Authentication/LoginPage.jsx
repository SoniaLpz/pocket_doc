import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../service/authService";
import { useNavigate } from 'react-router-dom';



function LoginPage() {
    const [formData, setFormData] = useState({ 
        email : "", 
        password : ""
    }) 

    function handleChange(event) {
        const {name, value} = event.target; 
        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    }

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault(); 
        if(!formData.email || !formData.password) {
            console.log("All fields are mandatory to login")
            return
        }

        try {
            const data = await loginUser(formData)
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("userName", data.user.username);

            navigate("/home")
        } catch (error) {
           console.error(error) 
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input 
            required
            id = "email"
            name = "email"
            type = "email"
            value = {formData.email}
            onChange = {handleChange}
            />

            <label htmlFor="password">Password</label>
            <input 
            required
            id = "password"
            name = "password"
            type = "password"
            value = {formData.password}
            onChange = {handleChange}
            />

            <button type= "submit">
              Login
            </button>

            <p>
                No account ?
                <Link to="/register"> Create an account</Link>
            </p>
        </form>
        
    )
}

export default LoginPage; 
