export const getUserByUsername = async ({ term, setData }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    if (term) {
        try {
            const response = await fetch(
                `${apiUrl}/users/?search=${encodeURIComponent(term)}`,
            );
            if (response.ok) {
                const data = await response.json();
                setData(data);
            }
        } catch (error) {
            setData([]);
        }
    } else {
        setData([]);
    }
};
