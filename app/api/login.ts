export default async function login(email: string, password: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.error || "Login failed");
        }

        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        return data.token;
    } catch(err) {
        throw new Error(err instanceof Error ? err.message : "An unknown error occurred");
    }
}