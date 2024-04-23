export const getUserChats = async ({ authTokens, setData }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
        const response = await fetch(`${apiUrl}/chats/list/`, {
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
