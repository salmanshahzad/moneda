import db from "../db";
import request from "supertest";
import app from "../src/app";

afterAll(async done => {
    const userId = (await db("users").select("id").where({username: "testuser2"}))[0].id;
    await db("users").delete().where({id: userId});
    await db("income").delete().where({user_id: userId});
    await db("expenses").delete().where({user_id: userId});
    await db("transactions").delete().where({user_id: userId});
    db.destroy(done);
});

describe("/api/user", () => {
    it("sends 401 when not signed in", done => {
        request(app).get("/api/user").expect(401, done);
    });

    it("sends 200 when signed in", async done => {
        const server = request.agent(app);
        await server.post("/api/register").send({
            username: "testuser2",
            password: "testuser2",
            confirmPassword: "testuser2"
        });
        server.get("/api/user").expect(200, done);
    });
});

describe("/api/add_transaction", () => {
    let server: request.SuperTest<request.Test>;

    beforeAll(async done => {
        server = request.agent(app);
        await server.post("/api/sign_in").send({
            username: "testuser2",
            password: "testuser2"
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

describe("/api/update_user", () => {
    let server: request.SuperTest<request.Test>;

    beforeAll(async done => {
        server = request.agent(app);
        await server.post("/api/sign_in").send({
            username: "testuser2",
            password: "testuser2"
        });
        done();
    });

    it("sends 401 when not signed in", done => {
        request(app).post("/api/update_user").expect(401, done);
    });

    it("sends 400 with no inputs", done => {
        server.post("/api/update_user").expect(400, [
            "Please enter a username, password, confirm password, and current password."
        ], done);
    });

    it("sends 400 with invalid inputs", done => {
        server.post("/api/update_user").send({
            username: "test",
            password: "test",
            confirmPassword: "test",
            currentPassword: "test"
        }).expect(400, [
            "Please enter a username with at least 5 characters.",
            "Please enter a password with at least 8 characters.",
            "Incorrect password."
        ], done);
    });

    it("sends 400 if the current password is incorrect", done => {
        server.post("/api/update_user").send({
            username: "testuser2",
            password: "testuser22",
            confirmPassword: "testuser22",
            currentPassword: ""
        }).expect(400, [
            "Incorrect password."
        ], done);
    });

    it("sends 200 with valid inputs", done => {
        server.post("/api/update_user").send({
            username: "testuser2",
            password: "testuser22",
            confirmPassword: "testuser22",
            currentPassword: "testuser2"
        }).expect(200, done);
    });
});
