import { useEffect, useState } from "react"; 
import { getAllRecipes, deleteRecipe, modifyRecipe } from "../../service/recipeService"; 
import { useParams } from "react-router-dom";
import "./recipes.css"


function Recipes() {
    const [recipes, setRecipes] = useState([]); 
    const [message, setMessage] = useState(""); 
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(true);
    const [editRecipe, setEditRecipe] = useState(null)
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0); 
    const { id } = useParams();

    useEffect(() => {
        async function loadRecipes() {
            try {
              const data = await getAllRecipes(); 
              setRecipes(data); 
            } catch (error) {
                console.error(error); 
                setError("Unable to load recipes")
            } finally {
                setLoading(false);
            }   
        }

        loadRecipes();
    }, [])

    const recipesForCurrentSymptom = recipes.filter(
      (recipe) => recipe.symptom === id
    );

    const currentRecipe = recipesForCurrentSymptom[currentRecipeIndex]; 

    const currentUserId = Number(localStorage.getItem("userId"))

    function handleNext() {
        if(currentRecipeIndex < recipesForCurrentSymptom.length -1) {
            setCurrentRecipeIndex(currentRecipeIndex + 1)
        }
    }

    function handlePrevious() {
      if(currentRecipeIndex > 0) {
            setCurrentRecipeIndex(currentRecipeIndex - 1)
        }
    }

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
            setError("")
            setMessage("Recipe updated");
        } catch (error) {
            console.error(error)
            setMessage("")
            setError("Unable to update the recipe")
        }
        
    }

    async function handleDelete(id) {
        const confirmed = window.confirm("Are you sure you want to delete this recipe?");
        try {
          await deleteRecipe(id); 
          setRecipes((previousRecipes)=> 
        previousRecipes.filter((recipe) => recipe.id !==id));
          setError("");
          setMessage("Recipe deleted successfully");
        } catch (error) {
          console.error(error);
          setMessage("")
          setError("Unable to delete the recipe");
        }
        
    }

    return(
        <main>
        <div className="Recipes">
          <h3>Recipes</h3>
          {loading && <p> Loading Recipes</p>}
          {!loading && recipesForCurrentSymptom.length === 0 && !error && (
            <p>No recipes created yet for this symptom.</p>
        )}
        {error && ( 
            <p className="errorMessage">
              {error}   
            </p>
        )}
        {currentRecipe && (
            <div className="RecipeCarousel"> 
            <button className="CarouselButton" type="button" onClick={handlePrevious} disabled={currentRecipeIndex === 0}>
                ←
            </button>

            <article className="CardRecipes" key={currentRecipe.id}>
                <h4>{currentRecipe.title}</h4>
                <p>
                    <strong>Ingredients:</strong> {currentRecipe.ingredients}
                </p>
                <p>
                    <strong>Instructions:</strong> {currentRecipe.instructions}
                </p>
                <p>
                    <strong>Cooking Time:</strong> {" "} {currentRecipe.cookingTime} minutes
                </p>
                {currentRecipe.userId === currentUserId &&(
                    <>
                    <button className="CardButton" type="button" onClick={()=> handleEdit(currentRecipe)}> Update </button>
                    <button className="CardButton" type="button" onClick={()=> handleDelete(currentRecipe.id)}> Delete </button>
                    </>
                )}
            </article>
             <button className="CarouselButton" type="button" onClick={handleNext} disabled={currentRecipeIndex === recipesForCurrentSymptom.length -1}>
                 →
            </button>
            {error && <p className="errorMessage">{error}</p>}
            {message && <p className="successMessage">{message}</p>}
            </div>
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
                name="cookingTime"
                value={editRecipe.cookingTime}
                onChange={handleEditChange}
                />
                <button type="submit">Save changes</button>
                <button type="button" onClick={() => setEditRecipe(null)}>Cancel</button>
            </form>
        )}
      </div>
      </main>
    )
}

export default Recipes; 