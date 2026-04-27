const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('recipes', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;