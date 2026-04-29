const url = 'http://localhost:3002/recipes'

export async function getAllRecipes() {
    try {
        const response = await fetch(url); 
        if(!response.ok) {
          throw new Error(await response.text())
        }
    } catch (error) {
        console.log(error); 
        throw newError('Failed to fetch Topics!')
    }
}

export async function createRecipe(title) {
    try {
        const response = await fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(title)
        });
        if(!response.ok) {
            throw new Error(await response.text())
        }

        return await response.json()
    } catch (error) {
        console.log(error); 
        throw new Error('Failed to create Recipe!')
    }
    
}