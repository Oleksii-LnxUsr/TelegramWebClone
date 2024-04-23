export const getChatMessages = async ({ authTokens, uuid, setData }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log(authTokens?.access);
    try {
        const response = await fetch(`${apiUrl}/chats/${uuid}/messages/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authTokens?.access}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setData(data);
        }
    } catch (error) {
        setData([]);
    }
};
