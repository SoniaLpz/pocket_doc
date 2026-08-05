import { useState } from "react";
import { registerUser } from "../service/authService";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";



function RegisterPage() {
    const [formData, setFormData] = useState({
        username : "", 
        email : "", 
        password : ""
    }) 

    function handleChange(event) {
        const {name, value} = event.target; 
        setFormData((previousData) =>({
            ...previousData,
            [name]: value
        }));
    }

    const navigate = useNavigate();

   async function handleSubmit(event) {
        event.preventDefault(); 
        if(!formData.username || !formData.email || !formData.password) {
            console.log("All fields are mandatory to register")
            return; 
        }
        try {
          const data = await registerUser(formData)
          console.log(data);

          setFormData({
            username: "",
            email: "",
            password: "",
          });

          navigate("/login");

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Name</label>
            <input 
            required 
            id = "username"
            name = "username"
            type = "text"
            value = {formData.username}
            onChange = {handleChange}
            />

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
              Register
            </button>

             <p>
                You already have an account ?
                <Link to="/login"> Login to your account</Link>
            </p>

        </form>
    )
}

export default RegisterPage; 