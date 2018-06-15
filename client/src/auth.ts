import axios from "axios";

export default {
    isAuthenticated: () => window.localStorage.getItem("auth") === "true",
    signIn: (username: string, password: string) => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/sign_in", {username, password});
                window.localStorage.setItem("auth", "true");
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    },
    signOut: () => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/sign_out");
                window.localStorage.removeItem("auth");
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
}
