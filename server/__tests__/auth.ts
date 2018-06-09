import * as request from "supertest";
import * as session from "supertest-session";
import server from "../src/index";

describe("/api/signed_in", () => {
    it("sends 200 with true or false depending on if signed in", done => {
        const testSession = session(server);
        testSession.get("/api/signed_in").expect(200, "false", () => {
            testSession.post("/api/register").send({
                username: "test1",
                password: "test1234",
                confirmPassword: "test1234"
            }).end(() => {
                testSession.get("/api/signed_in").expect(200, "true", done);
            });
    });
});

describe("/api/register", () => {
    it("sends 400 with no inputs", done => {
        request(server).post("/api/register").expect(400, [
            "Please enter a username with at least 5 characters.",
            "Please enter a password with at least 8 characters."
        ], done);
    });

    it("sends 400 with invalid inputs", done => {
        request(server).post("/api/register").send({
            username: "test",
            password: "test"
        }).expect(400, [
            "Please enter a username with at least 5 characters.",
            "Please enter a password with at least 8 characters."
        ], done);
    });

    it("sends 200 with valid inputs", done => {
        request(server).post("/api/register").send({
            username: "test12345",
            password: "test12345",
            confirmPassword: "test12345"
        }).expect(200, done);
    });
});

describe("/api/sign_in", () => {
    it("sends 400 with no inputs", done => {
        request(server).post("/api/sign_in").expect(400, [
            "Incorrect username/password."
        ], done);
    });

    it("sends 400 with invalid inputs", done => {
        request(server).post("/api/sign_in").send({
            username: "",
            password: ""
        }).expect(400, [
            "Incorrect username/password."
        ], done);
    });

    it("sends 200 with valid inputs", done => {
        request(server).post("/api/sign_in").send({
            username: "test12345",
            password: "test12345"
        }).expect(200, done);
    });
});

describe("/api/sign_out", () => {
    it("sends 200 when no user is signed in", done => {
        request(server).post("/api/sign_out").expect(200, done);
    });

    it("sends 200 and signs out when a user is signed in", done => {
        const testSession = session(server);
        testSession.post("/api/sign_in").send({
            username: "test12345",
            password: "test12345"
        }).end(() => {
            testSession.get("/api/signed_in").expect(200, "true", () => {
                testSession.post("/api/sign_out").expect(200, () => {
                    testSession.get("/api/signed_in").expect(200, "false", done);
                });
            });
        });
    });
});
