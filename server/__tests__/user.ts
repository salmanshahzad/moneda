import * as mongoose from "mongoose";
import { User } from "../src/models/user";
import * as request from "supertest";
import * as session from "supertest-session";
import app from "../src/app";

beforeAll(() => {
    mongoose.connect("mongodb://localhost:27017/moneda");
});

afterAll(done => {
    User.findOneAndRemove({username: "testuser"}).then(() => {
        mongoose.disconnect(done);
    });
});

describe("/api/user", () => {
    it("sends 401 when not signed in", done => {
        request(app).get("/api/user").expect(401, done);
    });

    it("sends 200 when signed in", done => {
        const testSession = session(app);
        testSession.post("/api/register").send({
            username: "testuser",
            password: "testuser",
            confirmPassword: "testuser"
        }).then(() => {
            testSession.get("/api/user").expect(200, done);
        });
    });
});

describe("/api/add_transaction", () => {
    let testSession;

    beforeAll(done => {
        testSession = session(app);
        testSession.post("/api/sign_in").send({
            username: "testuser",
            password: "testuser"
        }).then(() => done());
    });

    it("sends 401 when not signed in", done => {
        request(app).post("/api/add_transaction").expect(401, done);
    });

    it("sends 400 with no inputs", done => {
        testSession.post("/api/add_transaction").expect(400, [
            "Please enter an account name.",
            "Please enter a positive amount.",
            "Please enter income or expenses as the type."
        ], done);
    });

    it("sends 400 with invalid inputs", done => {
        testSession.post("/api/add_transaction").send({
            account: "test",
            amount: -1,
            type: "test"
        }).expect(400, [
            "Please enter a positive amount.",
            "Please enter income or expenses as the type."
        ], done);
    });

    it("sends 400 if the account does not exist", done => {
        testSession.post("/api/add_transaction").send({
            account: "test",
            amount: 1,
            type: "expenses"
        }).expect(400, [
            "Account does not exist."
        ], done);
    });

    it("sends 200 with valid inputs", done => {
        testSession.post("/api/add_transaction").send({
            account: "Entertainment",
            amount: 1,
            type: "expenses"
        }).expect(200, done);
    });
});
