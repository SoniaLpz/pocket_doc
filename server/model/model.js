const { DataTypes } = require('sequelize');
const sequelize = require('../DataBase/database');

const recipe = sequelize.define(
    'recipe', 
    {
    title: {
        type: DataTypes.STRING,
      allowNull: false,
    }, 
    ingredients: DataTypes.TEXT,
    instructions: DataTypes.TEXT, 
    cookingTime: DataTypes.INTEGER, 
    }
)

module.exports = recipe;