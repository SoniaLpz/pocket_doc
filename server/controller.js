import {recipe} from "./model/model"; 

export const getAllRecipe = async(ctx) => {
    try {
      const res = await recipe.find(); 
      ctx.status = 200; 
      ctx.body = res; 
    } catch (error) {
      console.log(error); 
      ctx.status = 500;
    }
}

export const addRecipe = async(ctx) => {
    try {
    const {recipe} = ctx.request.body
    const request = await recipe.create({
        title, 
        ingredients, 
        instructions, 
        cookingTime,
    }); 
    ctx.status = 201;
    ctx.body = request; 

    } catch (error) {
    console.log(error); 
      ctx.status = 500;
    }
}



