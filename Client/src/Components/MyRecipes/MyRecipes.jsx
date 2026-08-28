import { useEffect, useState} from "react"; 
import { getAllRecipes } from '../../service/recipeService'; 

function MyRecipes() { 

    const [recipes, setRecipes] = useState([]); 

    const currentUserId = Number(localStorage.getItem("userId"));

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

    const myRecipes = recipes.filter((recipe) => recipe.userId === currentUserId); 

    return (
        <main>
            <h1>My Recipes</h1>
            {myRecipes.length === 0 ? (<p>You have not created any recipes yet.</p>)
            :(
             myRecipes.map((recipe) => (
             <article key={recipe.id}>
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
             </article>))   
            )
        }
        </main>

    )
}

export default MyRecipes;