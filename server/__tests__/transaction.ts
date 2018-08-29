import request from "supertest";
import app from "../src/app";

let token: string;
let transactionId: string;

beforeAll(done => {
    request(app).post("/api/user").send({
        username: "testtransaction",
        password: "testtransaction",
        confirmPassword: "testtransaction"
    }).end((err, res) => {
        token = res.body.token;
        request(app).post("/api/user/transaction").set("Authorization", `Bearer ${token}`).send({
            categoryId: "00000000-0000-0000-0000-000000000000",
            amount: 1
        }).end((err, res) => {
            transactionId = res.body.transaction.id;
            done();
        });
    });
});

afterAll(done => {
    request(app).delete("/api/user").set("Authorization", `Bearer ${token}`).end(done);
});

describe("GET /api/user/transaction", () => {
    it("sends 401 if the token is not given", done => {
        request(app).get("/api/user/transaction?upcoming=false").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).get("/api/user/transaction?upcoming=false").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 200 and the transactions if the token is valid", done => {
        request(app).get("/api/user/transaction?upcoming=false").set("Authorization", `Bearer ${token}`).expect(200).end((err, res) => {
            expect(res.body).toHaveProperty("transactions");
            expect(res.body.transactions).toBeInstanceOf(Array);
            expect(res.body.transactions[0].id).toBe(transactionId);
            done();
        });
    });
});

describe("GET /api/transaction/:id", () => {
    it("sends 401 if the token is not given", done => {
        request(app).get("/api/user/transaction/x").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).get("/api/user/transaction/x").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 400 if the id is invalid", done => {
        request(app).get("/api/user/transaction/x").set("Authorization", `Bearer ${token}`).expect(400, {
            errors: ["Invalid id."]
        }, done);
    });

    it("sends 404 if a transaction with the id does not exist", done => {
        request(app).get("/api/user/transaction/00000000-0000-0000-0000-000000000000").set("Authorization", `Bearer ${token}`).expect(404, {
            errors: ["A transaction with that id does not exist."]
        }, done);
    });

    it("sends 200 with the transaction if the parameters are valid", done => {
        request(app).get(`/api/user/transaction/${transactionId}`).set("Authorization", `Bearer ${token}`).expect(200).end((err, res) => {
            expect(res.body).toHaveProperty("transaction");
            expect(res.body.transaction).toHaveProperty("id");
            expect(res.body.transaction.id).toBe(transactionId);
            done();
        });
    });
});

describe("POST /api/user/transaction", () => {
    it("sends 401 if the token is not given", done => {
        request(app).post("/api/user/transaction").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).post("/api/user/transaction").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 400 if the required parameters are not given", done => {
        request(app).post("/api/user/transaction").set("Authorization", `Bearer ${token}`).expect(400, {
            errors: [
                "Invalid category id.",
                "Amount must be positive."
            ]
        }, done);
    });

    it("sends 200 and the transaction object if the parameters are valid", done => {
        request(app).post("/api/user/transaction").set("Authorization", `Bearer ${token}`).send({
            categoryId: "00000000-0000-0000-0000-000000000000",
            amount: 1
        }).expect(200).end((err, res) => {
            expect(res.body).toHaveProperty("transaction");
            expect(res.body.transaction).toHaveProperty("amount");
            expect(res.body.transaction.amount).toBe(1);
            done();
        });
    });
});

describe("POST /api/user/transaction/import", () => {
    it("sends 401 if the token is not given", done => {
        request(app).post("/api/user/transaction/import").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).post("/api/user/transaction/import").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 400 if the required parameters are not given", done => {
        request(app).post("/api/user/transaction/import").set("Authorization", `Bearer ${token}`).expect(400, {
            errors: [
                "Transactions array is required."
            ]
        }, done);
    });

    it("sends 200 and the transactions array if the parameters are valid", done => {
        request(app).post("/api/user/transaction/import").set("Authorization", `Bearer ${token}`).send({
            transactions: [
                {
                    category: "A",
                    amount: 1,
                    date: "January 1, 2018"
                },
                {
                    category: "B",
                    amount: 0,
                    date: "January 1, 2018"
                },
                {
                    category: "C",
                    amount: 2,
                    date: "January 1, 2018"
                }
            ]
        }).expect(200).end((err, res) => {
            expect(res.body).toHaveProperty("transactions");
            expect(res.body.transactions).toBeInstanceOf(Array);
            expect(res.body.transactions).toHaveLength(2);
            expect(res.body.transactions[0]).toHaveProperty("amount");
            expect(res.body.transactions[0].amount).toBe(1);
            done();
        });
    });
});

describe("PUT /api/user/transaction/:id", () => {
    it("sends 401 if the token is not given", done => {
        request(app).put("/api/user/transaction/x").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).put("/api/user/transaction/x").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 400 if the id is invalid", done => {
        request(app).put("/api/user/transaction/x").set("Authorization", `Bearer ${token}`).expect(400, {
            errors: ["Invalid id."]
        }, done);
    });

    it("sends 404 if a transaction with the id does not exist", done => {
        request(app).put("/api/user/transaction/00000000-0000-0000-0000-000000000000").set("Authorization", `Bearer ${token}`).expect(404, {
            errors: ["A transaction with that id does not exist."]
        }, done);
    });

    it("sends 200 and the transaction object if the parameters are valid", done => {
        request(app).put(`/api/user/transaction/${transactionId}`).set("Authorization", `Bearer ${token}`).expect(200).end((err, res) => {
            expect(res.body).toHaveProperty("transaction");
            expect(res.body.transaction).toHaveProperty("id");
            expect(res.body.transaction.id).toBe(transactionId);
            done();
        });
    });
});

describe("DELETE /api/user/transaction/:id", () => {
    it("sends 401 if the token is not given", done => {
        request(app).delete("/api/user/transaction/x").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).delete("/api/user/transaction/x").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 400 if the id is invalid", done => {
        request(app).delete("/api/user/transaction/x").set("Authorization", `Bearer ${token}`).expect(400, {
            errors: ["Invalid id."]
        }, done);
    });

    it("sends 404 if a transaction with the id does not exist", done => {
        request(app).delete("/api/user/transaction/00000000-0000-0000-0000-000000000000").set("Authorization", `Bearer ${token}`).expect(404, {
            errors: ["A transaction with that id does not exist."]
        }, done);
    });

    it("sends 204 if the token is valid", done => {
        request(app).delete(`/api/user/transaction/${transactionId}`).set("Authorization", `Bearer ${token}`).expect(204, done);
    });
});
