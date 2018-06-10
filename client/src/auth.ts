import axios from "axios";

export default {
    isAuthenticated: () => window.localStorage.getItem("auth") === "true",
    signIn: (username: string, password: string) => {
        return new Promise<boolean>((resolve, reject) => {
            axios.post("/api/sign_in", {username, password}).then(() => {
                window.localStorage.setItem("auth", "true");
                resolve(true);
            }).catch(e => reject(e));
        });
    },
    signOut: () => {
        return new Promise<boolean>((resolve, reject) => {
            axios.post("/api/sign_out").then(() => {
                window.localStorage.removeItem("auth");
                resolve(true);
            }).catch(e => reject(e));
        });
    }
}
