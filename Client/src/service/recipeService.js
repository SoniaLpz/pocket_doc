const url = 'http://localhost:3002/recipes';

export async function getAllRecipes() {
    try {
        const response = await fetch(url); 
        if(!response.ok) {
          throw new Error(await response.text())
        }

        return await response.json()
    } catch (error) {
        console.error(error); 
        throw new Error('Failed to fetch recipes!')
    }
}

export async function createRecipe(recipeData) {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(recipeData)
        });
        if(!response.ok) {
            throw new Error(await response.text())
        }

        return await response.json()
    } catch (error) {
        console.error(error); 
        throw new Error('Failed to create Recipe!')
    }
    
}

export async function modifyRecipe(id, recipeData) {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${url}/${id}`, {
            method: "PUT", 
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(recipeData)
        });
        if(!response.ok) {
            throw new Error(await response.text())
        }

        return await response.json()
    } catch (error) {
        console.error(error); 
        throw new Error('Failed to modify Recipe!')
    }
    
}

export async function deleteRecipe(id) {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE", 
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        if(!response.ok) {
            throw new Error(await response.text())
        }

    } catch (error) {
        console.error(error); 
        throw new Error('Failed to delete Recipe!')
    }
    
}