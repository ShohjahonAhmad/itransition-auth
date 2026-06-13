export default async function deleteUnverifiedUsers(userIds: string[]) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/unverified`, {
            method: "DELETE",
            body: JSON.stringify({ userIds }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to delete unverified users");
        }
    } catch(err) {
        throw new Error(err instanceof Error ? err.message : "An unknown error occurred");
    }
}