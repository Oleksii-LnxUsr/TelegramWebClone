export const getChatInfo = async ({
    authTokens,
    uuid,
    setData,
    logout,
    navigate,
}) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
        const response = await fetch(`${apiUrl}/chats/${uuid}/`, {
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
        if (response?.status === 401) {
            logout();
        }
        if (response?.status === 404) {
            navigate("/");
        }
    } catch (error) {
        setData([]);
    }
};
