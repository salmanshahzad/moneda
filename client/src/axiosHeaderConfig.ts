export default (): { headers: { authorization: string } } => ({
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
});
