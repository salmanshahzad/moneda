import mongoose from "mongoose";
import { User } from "../src/models/user";
import request from "supertest";
import app from "../src/app";

beforeAll(() => {
    mongoose.connect("mongodb://localhost:27017/moneda");
});

afterAll(async done => {
    await User.findOneAndRemove({username: "testuser"});
    mongoose.disconnect(done);
});

describe("/api/register", () => {
    it("sends 400 with no inputs", done => {
        request(app).post("/api/register").expect(400, [
            "Please enter a username with at least 5 characters.",
            "Please enter a password with at least 8 characters."
        ], done);
    });

    it("sends 400 with invalid inputs", done => {
        request(app).post("/api/register").send({
            username: "test",
            password: "test"
        }).expect(400, [
            "Please enter a username with at least 5 characters.",
            "Please enter a password with at least 8 characters."
        ], done);
    });

    it("sends 200 with valid inputs", done => {
        request(app).post("/api/register").send({
            username: "testuser",
            password: "testuser",
            confirmPassword: "testuser"
        }).expect(200, done);
    });
});

describe("/api/sign_in", () => {
    it("sends 400 with no inputs", done => {
        request(app).post("/api/sign_in").expect(400, [
            "Incorrect username/password."
        ], done);
    });

    it("sends 400 with invalid inputs", done => {
        request(app).post("/api/sign_in").send({
            username: "",
            password: ""
        }).expect(400, [
            "Incorrect username/password."
        ], done);
    });

    it("sends 200 with valid inputs", done => {
        request(app).post("/api/sign_in").send({
            username: "testuser",
            password: "testuser"
        }).expect(200, done);
    });
});

describe("/api/sign_out", () => {
    it("sends 200 when no user is signed in", done => {
        request(app).post("/api/sign_out").expect(200, done);
    });

    it("sends 200 and signs out when a user is signed in", async done => {
        const server = request.agent(app);
        await server.post("/api/sign_in").send({
            username: "testuser",
            password: "testuser"
        });
        await server.get("/api/user").expect(200);
        await server.post("/api/sign_out").expect(200);
        server.get("/api/user").expect(401, done);
    });
});
