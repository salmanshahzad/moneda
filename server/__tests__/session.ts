import request from "supertest";
import app from "../src/app";

let token: string;

beforeAll(done => {
    request(app).post("/api/user").send({
        username: "testsession",
        password: "testsession",
        confirmPassword: "testsession"
    }).end((err, res) => {
        token = res.body.token;
        done();
    });
});

afterAll(done => {
    request(app).delete("/api/user").set("Authorization", `Bearer ${token}`).end(done);
});

describe("POST /api/session", () => {
    it("sends 400 if the required parameters are not given", done => {
        request(app).post("/api/session").expect(400, {
            errors: [
                "Incorrect username/password."
            ]
        }, done);
    });

    it("sends 422 if the username and/or password are incorrect", done => {
        request(app).post("/api/session").send({
            username: "testsession",
            password: "testsession1"
        }).expect(422, {
            errors: [
                "Incorrect username/password."
            ]
        }, done);
    });

    it("sends 200 and a token if the parameters are valid", done => {
        request(app).post("/api/session").send({
            username: "testsession",
            password: "testsession"
        }).expect(200).end((err, res) => {
            expect(res.body).toHaveProperty("token");
            expect(res.body.token).toMatch(/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/);
            token = res.body.token;
            done();
        });
    });
});
