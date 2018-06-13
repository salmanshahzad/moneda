import * as request from "supertest";
import * as session from "supertest-session";
import server from "../src/index";

describe("/api/user", () => {
    let testSession;

    beforeAll(done => {
        testSession = session(server);
        testSession.post("/api/register").send({
            username: "testuser",
            password: "testuser",
            confirmPassword: "testuser"
        }).end(done);
    });

    it("sends 401 when not signed in", done => {
        request(server).get("/api/user").expect(401, done);
    });

    it("sends 200 when signed in", done => {
        testSession.get("/api/user").expect(200, done);
    });
});

describe("/api/add_transaction", () => {
    let testSession;

    beforeAll(done => {
        testSession = session(server);
        testSession.post("/api/sign_in").send({
            username: "testuser",
            password: "testuser"
        }).end(done);
    });

    it("sends 401 when not signed in", done => {
        request(server).post("/api/add_transaction").expect(401, done);
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
