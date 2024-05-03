import toast from "react-hot-toast";

export const deleteChat = async ({ authTokens, uuid, logout }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
        const response = await fetch(`${apiUrl}/chats/${uuid}/delete/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authTokens?.access}`,
            },
        });

        if (response?.status === 201) {
            toast.success("Chat deleted");
        }
        if (response?.status === 401) {
            logout();
        }
    } catch (error) {
        toast.error("Delete chat failed");
    }
};
