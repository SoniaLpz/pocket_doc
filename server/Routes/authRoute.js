const Router = require('@koa/router');
const {register, login} = require('../Controller/authController'); 

const authRoute = new Router({
    prefix: "/auth", 
}); 

authRoute.post("/register", register); 
authRoute.post("/login", login); 

module.exports = authRoute; 