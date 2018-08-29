export default () => ({
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
});
