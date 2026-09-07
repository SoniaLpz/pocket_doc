import { useEffect, useState} from "react"; 
import { getAllRecipes, deleteRecipe, modifyRecipe } from '../../service/recipeService'; 
import './MyRecipes.css'
import { useNavigate } from "react-router-dom";

function MyRecipes() { 

    const [recipes, setRecipes] = useState([]);
    const [editRecipe, setEditRecipe] = useState(null) 
    const [message, setMessage] = useState("");
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const currentUserId = Number(localStorage.getItem("userId"));

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

    const myRecipes = recipes.filter((recipe) => recipe.userId === currentUserId);
    
    async function handleDelete(id) {
        const confirmed = window.confirm("Are you sure you want to delete this recipe?");
        try {
          await deleteRecipe(id); 
          setRecipes((myRecipes)=> 
            myRecipes.filter((recipe) => recipe.id !==id))
          setError("");
          setMessage("Recipe deleted successfully");
        } catch (error) {
          console.error(error)
          setMessage("")
          setError("Unable to delete the recipe");
        }
        
    }

    return (
        <main>
            <div className="returnButton">
      <button onClick={() => navigate(`/home`)}>Go to menu</button>
    </div>
            <h1>My Recipes</h1>
            {loading && <p>Loading recipes ...</p>}
            {error && (
                <p className='errorMessage'>
                  {error}    
                </p>
            )}
            <div className='MyRecipes'>
            {!loading && !error && myRecipes.length === 0 ? (<p>You have not created any recipes yet.</p>)
            :(
             myRecipes.map((recipe) => (
             <article className='CardRecipes' key={recipe.id}>
                <h2>{recipe.title}</h2>
                <p>
                    <strong>Ingredients:</strong> {recipe.ingredients}
                </p>
                <p>
                    <strong>Instructions:</strong> {recipe.instructions}
                </p>
                <p>
                    <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                </p>
                <button className="CardButton" type="button" onClick={()=> navigate(`/symptoms/${recipe.symptom}`)}> View </button>
                <button className="CardButton" type="button" onClick={()=> handleDelete(recipe.id)}> Delete </button>

             </article>))   
            )
        }
        </div>
        </main>

    )
}

export default MyRecipes;