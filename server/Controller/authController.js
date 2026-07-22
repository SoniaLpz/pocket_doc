const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const User = require("../model/user"); 

const register = async(ctx) => {
    try {
        const {username, password, email} =ctx.request.body; 
        if(!username || !password || !email) {
            ctx.status = 400; 
            ctx.body = {
                message : "Username, password and email are required to register"
            }
            return; 
        }

        const existingUser = await User.findOne({
            where: {email},
        }); 

        if(existingUser) {
            ctx.status = 409; 
            ctx.body = {
                message : "Email already registered"
            }
            return; 
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const user = await User.create({
            username, 
            password: hashedPassword, 
            email, 
        })

        ctx.status = 201; 
        ctx.body = {
            message: "User created", 
            user: {
                id : user.id, 
                username: user.username, 
                email: user.email,   
            },
        }

    } catch (error) {
        console.log(error)
        ctx.status = 500; 
        ctx.body = {
            message: "Creation of user impossible"
        }
    }
}

const login = async(ctx) => {
    try {
        const {email, password} =ctx.request.body; 
        if(!email || !password ) {
            ctx.status = 400; 
            ctx.body = {
                message : "Email and password are required to Login"
            }
            return; 
        }
        
        const user = await User.findOne({ 
            where: {email},
        }); 

        if(!user) {
            ctx.status = 401; 
            ctx.body = {
                message : "Invalid email or password"
            };
            return
        }

        const passwordIsValid = await bcrypt.compare(password, user.password); 

        if(!passwordIsValid) {
            ctx.status = 401; 
            ctx.body = {
                message : "Invalid email or password"
            };
            return
        }

        const token = jwt.sign(
            {
                id: user.id,
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        ctx.status = 200; 
        ctx.body = {
            message: "Login successful", 
            token,
            user: {
                id : user.id, 
                username: user.username, 
                email: user.email,   
            },
        }

    } catch (error) {
        console.log(error)
        ctx.status = 500; 
        ctx.body = {
            message: " Login impossible"
        }
    }
}

module.exports = {register, login}