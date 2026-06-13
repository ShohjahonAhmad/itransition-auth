export default async function blockUsers(userIds: string[], block: boolean){
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/block`, {
            method: "PATCH",
            body: JSON.stringify({ userIds, block }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update user status");
        }

        return await response.json();
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : "An unknown error occurred");
    }
}