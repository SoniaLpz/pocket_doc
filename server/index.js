const Koa = require('koa');
const app = new Koa();

const sequelize = require("./DataBase/database");

(async () =>  {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      app.listen(3000);
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
})(); 


