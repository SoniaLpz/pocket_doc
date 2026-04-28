const Recipe = require ("./model/model"); 

const getAllRecipe = async(ctx) => {
    try {
      const res = await Recipe.findAll(); 
      ctx.status = 200; 
      ctx.body = res; 
    } catch (error) {
      console.log(error, "Error no recipes list"); 
      ctx.status = 500;
    }
}

const addRecipe = async(ctx) => {
    try {
    const {title, ingredients, instructions, cookingTime,} = ctx.request.body
    const request = await Recipe.create({
        title, 
        ingredients, 
        instructions, 
        cookingTime,
    }); 
    ctx.status = 201;
    ctx.body = request; 

    } catch (error) {
    console.log(error, "no recipe created"); 
      ctx.status = 500;
    }
}

module.exports = {getAllRecipe, addRecipe};

