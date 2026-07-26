const Router = require('@koa/router');
const {register, login} = require('../Controller/authController'); 
const authMiddleware = require('../Middleware/authMiddleware'); 

const authRoute = new Router({
    prefix: "/auth", 
}); 

authRoute.post("/register", register); 
authRoute.post("/login", login); 
authRoute.get("/profile", authMiddleware, async(ctx) => {
    ctx.body = {
        message : "Protected Route",
        user : ctx.state.user,
    }
})

module.exports = authRoute; 