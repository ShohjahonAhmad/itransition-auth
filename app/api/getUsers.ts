import type { User } from "~/types/user";

export type GetUsersResponse = {users: User[], user: User}

export default async function getUsers(token: string) : Promise<GetUsersResponse> {
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
        const users : GetUsersResponse = await response.json();
        return users;
    } catch(err) {
        console.error("Error fetching users:", err);
        throw err;
    }

}