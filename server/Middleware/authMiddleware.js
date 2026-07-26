const jwt = require("jsonwebtoken");

const authMiddleware = async(ctx, next) => {
    const authorizationHeader = ctx.headers.authorization; 

    if(!authorizationHeader) {
        ctx.status = 401; 
        ctx.body = {
            message : "Authntication token is required"
        }
        return; 
    }

    const [type, token] = authorizationHeader.split(" ")

     if(type !== "Bearer" || !token) {
        ctx.status = 401; 
        ctx.body = {
            message : "The token is invalid"
        }
        return; 
    }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = decodedToken; 
    await next()
  } catch (error) {
    console.error(error)
    ctx.status = 401; 
    ctx.body = {
        message : "Invalid or expired Token"
    }
  }
}

module.exports = authMiddleware; 