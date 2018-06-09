import * as request from "supertest";
import server from "../src/index";

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

    afterAll(() => {
        server.close();
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

    afterAll(() => {
        server.close();
    });
});
