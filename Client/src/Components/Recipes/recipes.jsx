import { useEffect, useState } from "react"; 
import { getAllRecipes, deleteRecipe, modifyRecipe } from "../../service/recipeService"; 
import { useParams } from "react-router-dom";
import "./recipes.css"


function Recipes() {
    const [recipes, setRecipes] = useState([]); 
    const [error, setError] = useState(""); 
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
            setCurrentRecipeIndex(currentRecipe+1)
        }
    }

    function handlePrevious() {
      if(currentRecipeIndex > 0) {
            setCurrentRecipeIndex(currentRecipe-1)
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
                name="CookingTime"
                value={editRecipe.cookingTime}
                onChange={handleEditChange}
                />
                <button type="button">Save changes</button>
                <button type="button" onClick={() => setEditRecipe(null)}>Cancel</button>
            </form>
        )}
      </div>
      </main>
    )
}

export default Recipes; 