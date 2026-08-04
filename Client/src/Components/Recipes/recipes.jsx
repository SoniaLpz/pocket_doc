import { useEffect, useState } from "react"; 
import { getAllRecipes, deleteRecipe, modifyRecipe } from "../../service/recipeService"; 
import { useParams } from "react-router-dom";


function Recipes() {
    const [recipes, setRecipes] = useState([]); 
    const [error, setError] = useState(""); 
    const [editRecipe, setEditRecipe] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        async function loadRecipes() {
            try {
              const data = await getAllRecipes(); 
              setRecipes(data); 
            } catch (error) {
                console.error(error); 
                setError("Unable to load recipes")
            }   
        }

        loadRecipes();
    }, [])

    const recipesForCurrentSymptom = recipes.filter(
      (recipe) => recipe.symptom === id
    );

    function handleEdit(recipe){
        setEditRecipe(recipe)
    }

    function handleEditChange(event) {
        const {name, value} = event.target; 

        setEditRecipe((previousRecipe) => ({
            ...previousRecipe, 
            [name]: value,
        }))
    }

    async function handleUpdate(event) {
        event.preventDefault(); 
        try {
            const updateRecipe = await modifyRecipe(
                editRecipe.id,
                editRecipe
            );

            setRecipes((previousRecipes) => 
                previousRecipes.map((recipe) =>
                recipe.id === updateRecipe.id ? updateRecipe : recipe)
            )
        } catch (error) {
            console.error(error)
        }
        
    }

    async function handleDelete(id) {
        try {
          await deleteRecipe(id); 
          setRecipes((previousRecipes)=> 
        previousRecipes.filter((recipe) => recipe.id !==id))
        } catch (error) {
          console.error(error)
        }
        
    }

    return(
        <main>
        <div className="Recipes">
      <h3>Recipes</h3>
        {error && <p>{error}</p>}
        {recipes.length === 0 && !error && (
        <p>No recipes created yet.</p>
        )}
        {recipesForCurrentSymptom.map((recipe)=> (
            <article key={recipe.id}>
                <h4>{recipe.title}</h4>
                <p>
                    <strong>Ingredients:</strong> {recipe.ingredients}
                </p>
                <p>
                    <strong>Instructions:</strong> {recipe.instructions}
                </p>
                <p>
                    <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                </p>
                <button type="button" className="deleteButton" onClick={()=> handleEdit(recipe)}> Update </button>
                <button type="button" className="deleteButton" onClick={()=> handleDelete(recipe.id)}> Delete </button>
            </article>
        )
        )}
        {editRecipe && (
            <form onSubmit={handleUpdate}>
                <input
                type="text"
                name="title"
                value={editRecipe.title}
                onChange={handleEditChange}

                />
                <input
                type="text"
                name="ingredients"
                value={editRecipe.ingredients}
                onChange={handleEditChange}

                />
                <input
                type="text"
                name="instructions"
                value={editRecipe.instructions}
                onChange={handleEditChange}

                />
                <input
                type="number"
                name="CookingTime"
                value={editRecipe.cookingTime}
                onChange={handleEditChange}
                />
                <button type="submit">Save changes</button>
                <button type="submit" onClick={() => setEditRecipe(null)}>Cancel</button>
            </form>
        )}
      </div>
      </main>
    )
}

export default Recipes; 