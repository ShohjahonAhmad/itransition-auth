export default async function register(name: string, email: string, password: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.error || "Registration failed");
        }

        return await response.json();
    } catch(err) {
        throw new Error(err instanceof Error ? err.message : "An unknown error occurred");
    }
}