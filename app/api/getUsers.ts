export default async function getUsers(token: string) {
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if(!response.ok){
            throw new Error("Failed to fetch users");
        }
        const users = await response.json();
        console.log(users);
        return users;
    } catch(err) {
        console.error("Error fetching users:", err);
        throw err;
    }

}