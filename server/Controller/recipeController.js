const Recipe = require ("../model/recipe"); 

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

const deleteRecipe = async (ctx) => {
  try {
    const { id } = ctx.params
    const recipe = await Recipe.findByPk(id)

    if(!recipe) {
      ctx.status = 404
      console.log("Recipe not found")
      return
    }
    await recipe.destroy()
    ctx.status = 200
    console.log("Recipe deleted")
  } catch (error) {
    ctx.status = 500
    console.log(error, "Error deleting recipe")
    
  }
}

const modifyRecipe = async (ctx) => {
  try {
    const { id } = ctx.params
    const recipe = await Recipe.findByPk(id)
  
    if(!recipe) {
        ctx.status = 404
        console.log("No recipe to modify")
        return
      }

    const {title, ingredients, instructions, cookingTime} = ctx.request.body
    await recipe.update({title, ingredients, instructions, cookingTime})
    ctx.body = recipe
    
  } catch (error) {
    ctx.status = 500
    console.log(error, "Error modifying recipe")
  }
  
}

module.exports = {getAllRecipe, addRecipe, deleteRecipe, modifyRecipe};

