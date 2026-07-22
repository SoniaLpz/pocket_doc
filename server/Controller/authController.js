const bcrypt = require("bcrypt"); 
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
                username: user.name, 
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

module.exports = {register}