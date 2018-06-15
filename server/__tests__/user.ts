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

describe("/api/user", () => {
    it("sends 401 when not signed in", done => {
        request(app).get("/api/user").expect(401, done);
    });

    it("sends 200 when signed in", async done => {
        const server = request.agent(app);
        await server.post("/api/register").send({
            username: "testuser",
            password: "testuser",
            confirmPassword: "testuser"
        });
        server.get("/api/user").expect(200, done);
    });
});

describe("/api/add_transaction", () => {
    let server: request.SuperTest<request.Test>;

    beforeAll(async done => {
        server = request.agent(app);
        await server.post("/api/sign_in").send({
            username: "testuser",
            password: "testuser"
        });
        done();
    });

    it("sends 401 when not signed in", done => {
        request(app).post("/api/add_transaction").expect(401, done);
    });

    it("sends 400 with no inputs", done => {
        server.post("/api/add_transaction").expect(400, [
            "Please enter an account name.",
            "Please enter a positive amount.",
            "Please enter income or expenses as the type."
        ], done);
    });

    it("sends 400 with invalid inputs", done => {
        server.post("/api/add_transaction").send({
            account: "test",
            amount: -1,
            type: "test"
        }).expect(400, [
            "Please enter a positive amount.",
            "Please enter income or expenses as the type."
        ], done);
    });

    it("sends 400 if the account does not exist", done => {
        server.post("/api/add_transaction").send({
            account: "test",
            amount: 1,
            type: "expenses"
        }).expect(400, [
            "Account does not exist."
        ], done);
    });

    it("sends 200 with valid inputs", done => {
        server.post("/api/add_transaction").send({
            account: "Entertainment",
            amount: 1,
            type: "expenses"
        }).expect(200, done);
    });
});
