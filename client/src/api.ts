import axios from "axios";

export const getAxiosHeaderConfig = (): { headers: { authorization: string } } => ({
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export default axios.create({
    baseURL: `${(process.env.BASE || "/")}api`
});
