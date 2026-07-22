const Router = require('@koa/router');
const {register} = require('../Controller/authController'); 

const authRoute = new Router({
    prefix: "/auth", 
}); 

authRoute.post("/register", register); 

module.exports = authRoute; 