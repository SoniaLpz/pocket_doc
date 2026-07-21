require("dotenv").config()
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const app = new Koa();

const sequelize = require("./DataBase/database");
const routes = require("./router");

app.use(cors());
app.use(bodyParser());
app.use(routes.routes());
app.use(routes.allowedMethods()); 

const PORT = process.env.PORT || 3002;

(async () =>  {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      await sequelize.sync()
      app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
})(); 


