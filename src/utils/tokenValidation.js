import { validateToken } from "../services/auth";

export async function checkToken(navigate, setToken, setImageProfile, page) {
    const tokenStorage = localStorage.getItem("token");
    const imageStorage = localStorage.getItem("image");

    if (tokenStorage && imageStorage) {
        const body = null;
        const config = {
            headers: {
                Authorization: `Bearer ${tokenStorage}`
            }
        }
        const response = await validateToken(body, config);

        if (response === 200) {
            setToken(tokenStorage);
            setImageProfile(imageStorage);
            navigate(`/${page}`);
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("image");
            navigate('/');
        }
    } else {
        navigate('/');
    }
}