import request from "supertest";
import app from "../src/app";

let token: string;

beforeAll(done => {
    request(app).post("/api/user").send({
        username: "testuser",
        password: "testuser",
        confirmPassword: "testuser"
    }).end((err, res) => {
        token = res.body.token;
        done();
    });
});

afterAll(done => {
    request(app).delete("/api/user").set("Authorization", `Bearer ${token}`).end(done);
});

describe("GET /api/user", () => {
    it("sends 401 if the token is not given", done => {
        request(app).get("/api/user").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).get("/api/user").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 200 and the user object if the token is valid", done => {
        request(app).get("/api/user").set("Authorization", `Bearer ${token}`).expect(200).end((err, res) => {
            expect(res.body).toHaveProperty("user");
            expect(res.body.user).toHaveProperty("username");
            expect(res.body.user).toHaveProperty("income");
            expect(res.body.user).toHaveProperty("expenses");
            expect(res.body.user).toHaveProperty("transactions");
            expect(res.body.user).toHaveProperty("upcomingTransactions");
            done();
        });
    });
});

describe("POST /api/user", () => {
    let token: string;

    it("sends 400 if the required parameters are not given", done => {
        request(app).post("/api/user").expect(400, {
            errors: [
                "Username must contain at least five characters.",
                "Password must contain at least eight characters."
            ]
        }, done);
    });

    it("sends 400 if the confirm password does not match the password", done => {
        request(app).post("/api/user").send({
            username: "salman",
            password: "salman11"
        }).expect(400, {
            errors: [
                "Passwords do not match."
            ]
        }, done);
    });

    it("sends 422 if the username already exists", done => {
        request(app).post("/api/user").send({
            username: "salman",
            password: "salman11",
            confirmPassword: "salman11"
        }).expect(422, {
            errors: [
                "A user with that username already exists."
            ]
        }, done);
    });

    it("sends 200 and a token if the parameters are valid", done => {
        request(app).post("/api/user").send({
            username: "testuser1",
            password: "testuser",
            confirmPassword: "testuser"
        }).expect(200).end((err, res) => {
            expect(res.body).toHaveProperty("token");
            expect(res.body.token).toMatch(/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/);
            token = res.body.token;
            done();
        });
    });

    afterAll(done => {
        request(app).delete("/api/user").set("Authorization", `Bearer ${token}`).end(done);
    });
});

describe("PUT /api/user", () => {
    it("sends 401 if the token is not given", done => {
        request(app).put("/api/user").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).put("/api/user").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 400 if the required parameters are not given", done => {
        request(app).put("/api/user").set("Authorization", `Bearer ${token}`).expect(400, {
            errors: [
                "Username must contain at least five characters.",
                "Current password is required."
            ]
        }, done);
    });

    it("sends 400 if the new password is invalid", done => {
        request(app).put("/api/user").set("Authorization", `Bearer ${token}`).send({
            username: "testuser",
            currentPassword: "testuser",
            newPassword: "test"
        }).expect(400, {
            errors: [
                "New password must contain at least eight characters.",
                "New passwords do not match."
            ]
        }, done);
    });

    it("sends 422 if the username already exists or the current password is incorrect", done => {
        request(app).put("/api/user").set("Authorization", `Bearer ${token}`).send({
            username: "salman",
            currentPassword: "testuser1",
            newPassword: "testuser",
            confirmNewPassword: "testuser"
        }).expect(422, {
            errors: [
                "A user with that username already exists.",
                "Incorrect password."
            ]
        }, done);
    });

    it("sends 200 and a token if the parameters are valid", done => {
        request(app).put("/api/user").set("Authorization", `Bearer ${token}`).send({
            username: "testuser",
            currentPassword: "testuser",
            newPassword: "testuser",
            confirmNewPassword: "testuser"
        }).expect(200).end((err, res) => {
            expect(res.body).toHaveProperty("token");
            expect(res.body.token).toMatch(/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/);
            token = res.body.token;
            done();
        });
    });
});

describe("DELETE /api/user", () => {
    it("sends 401 if the token is not given", done => {
        request(app).delete("/api/user").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).delete("/api/user").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 204 if the token is valid", done => {
        request(app).delete("/api/user").set("Authorization", `Bearer ${token}`).expect(204, done);
    });
});
