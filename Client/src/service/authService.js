const urlAuth = 'http://localhost:3002/auth';

export async function registerUser(formData) {
    try {
        const response = await fetch(`${urlAuth}/register`, {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(formData)
        });
        if(!response.ok) {
            throw new Error(await response.text())
        }
        return await response.json()
    } catch (error) {
        console.error(error); 
        throw new Error('Failed to register!')
    }
}

export async function loginUser(formData) {
    try {
        const response = await fetch(`${urlAuth}/login`, {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(formData)
        });
        if(!response.ok) {
            throw new Error(await response.text())
        }
        return await response.json()
    } catch (error) {
        console.error(error); 
        throw new Error('Failed to login!')
    }
}