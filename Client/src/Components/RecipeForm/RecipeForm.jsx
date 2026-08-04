import { useState } from "react";
import { createRecipe } from "../../service/recipeService";
import './Form.css';
import { useParams } from "react-router-dom";

function Recipe() {

  const {id} = useParams()
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

    if(!recipes.title || !recipes.ingredients || !recipes.instructions || !recipes.cookingTime) {
      console.log("All fields are mandatory"); 
      return 
    }

    try {
      const recipeData = {
        ...recipes, 
        symptom: id,
      }
      const data = await createRecipe(recipeData); 
        console.log("A recipe was submitted:", data);
        setRecipes({
          title: '',
          ingredients: '',
          instructions: '',
          cookingTime: 0
        })
    } catch (error) {
      console.error(error)
    }
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
      <button type="submit" className="recipeButton"> Submit</button>
      </form>
      </div>
  );
};

export default Recipe;