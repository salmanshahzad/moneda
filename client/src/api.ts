export const getApiPath = (path: string): string => `${process.env.BASE}api/${path}`;

export const getAxiosHeaderConfig = (): { headers: { authorization: string } } => ({
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
});
