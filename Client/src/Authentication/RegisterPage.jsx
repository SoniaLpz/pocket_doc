import { useState } from "react";

function RegisterPage() {
    const [formData, setFormData] = useState({
        username : "", 
        email : "", 
        password : ""
    }) 

    function handleChange(event) {
        const {name, value} = event.target; 
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault(); 
        console.log(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Name</label>
            <input 
            id = "username"
            name = "username"
            type = "text"
            value = {formData.username}
            onChange = {handleChange}
            />

            <label htmlFor="email">Email</label>
            <input 
            id = "email"
            name = "email"
            type = "email"
            value = {formData.email}
            onChange = {handleChange}
            />

            <label htmlFor="password">Password</label>
            <input 
            id = "password"
            name = "password"
            type = "password"
            value = {formData.password}
            onChange = {handleChange}
            />

            <button type= "submit">
              Register
            </button>

        </form>
    )
}

export default RegisterPage; 