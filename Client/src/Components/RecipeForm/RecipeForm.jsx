import { useState } from "react";
import {createRecipe} from "../../service/recipe" 

function Recipe() {
const [recipes, setRecipes] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cookingTime: 0
}); 
  
function handleChange (e) {
    setRecipes((prevalue) => {
        return {
            ...prevalue, 
            [e.target.name] : e.target.value
        }
    })
}
async function handleSubmit(e) {
    e.preventDefault();
    await createRecipe(recipes); 
     alert('A recipe was submitted');
  }

  return (
    <div className="Recipe">
      <h3>Add a recipe</h3>
      <form onSubmit={handleSubmit}>
      <div>
      <label> Title:</label>
        <input type="text" name="title" value={recipes.title} onChange={handleChange}  />
      </div>
      <div>
      <label> Ingredients: </label>
        <input type="text" name="ingredients"  value={recipes.ingredients} onChange={handleChange}  />
      </div>
      <div>
      <label> Inscructions:</label>
        <input type="text" name="instructions" value={recipes.instructions} onChange={handleChange}/>
      </div>
      <div>
      <label> Cooking time:</label>
        <input type="number" name="cookingTime" value={recipes.cookingTime} onChange={handleChange} />
      </div>
      <button type="submit"> Submit</button>
      </form>
      </div>

);
};

export default Recipe;