import request from "supertest";
import app from "../src/app";

let token: string;
let categoryId: string;

beforeAll(done => {
    request(app).post("/api/user").send({
        username: "testcategory",
        password: "testcategory",
        confirmPassword: "testcategory"
    }).end((err, res) => {
        token = res.body.token;
        done();
    });
});

afterAll(done => {
    request(app).delete("/api/user").set("Authorization", `Bearer ${token}`).end(done);
});

describe("GET /api/user/category", () => {
    it("sends 401 if the token is not given", done => {
        request(app).get("/api/user/category").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).get("/api/user/category").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 200 and the categories if the token is valid", done => {
        request(app).get("/api/user/category").set("Authorization", `Bearer ${token}`).expect(200).end((err, res) => {
            expect(res.body).toHaveProperty("income");
            expect(res.body.income).toBeInstanceOf(Array);
            expect(res.body.income[0]).toHaveProperty("income");
            expect(res.body).toHaveProperty("expenses");
            expect(res.body.expenses).toBeInstanceOf(Array);
            expect(res.body.expenses[0]).toHaveProperty("spent");
            categoryId = res.body.expenses[0].id;
            done();
        });
    });
});

describe("GET /api/category/:id", () => {
    it("sends 401 if the token is not given", done => {
        request(app).get("/api/user/category/x").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).get("/api/user/category/x").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 400 if the id is invalid", done => {
        request(app).get("/api/user/category/x").set("Authorization", `Bearer ${token}`).expect(400, {
            errors: ["Invalid id."]
        }, done);
    });

    it("sends 404 if a category with the id does not exist", done => {
        request(app).get("/api/user/category/00000000-0000-0000-0000-000000000000").set("Authorization", `Bearer ${token}`).expect(404, {
            errors: ["A category with that id does not exist."]
        }, done);
    });

    it("sends 200 with the category if the parameters are valid", done => {
        request(app).get(`/api/user/category/${categoryId}`).set("Authorization", `Bearer ${token}`).expect(200).end((err, res) => {
            expect(res.body).toHaveProperty("category");
            expect(res.body.category).toHaveProperty("id");
            expect(res.body.category.id).toBe(categoryId);
            done();
        });
    });
});

describe("POST /api/user/category", () => {
    it("sends 401 if the token is not given", done => {
        request(app).post("/api/user/category").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).post("/api/user/category").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 400 if the required parameters are not given", done => {
        request(app).post("/api/user/category").set("Authorization", `Bearer ${token}`).expect(400, {
            errors: [
                "Type must be income or expense.",
                "Name is required.",
                "Colour must be a hex string."
            ]
        }, done);
    });

    it("sends 400 if the type is expense and the budget is non-negative", done => {
        request(app).post("/api/user/category").set("Authorization", `Bearer ${token}`).send({
            type: "expense",
            name: "Expense",
            colour: "#ABCDEF",
            budget: -1
        }).expect(400, {
            errors: [
                "Budget must be non-negative."
            ]
        }, done);
    });

    it("sends 422 if the category name already exists", done => {
        request(app).post("/api/user/category").set("Authorization", `Bearer ${token}`).send({
            type: "expense",
            name: "Gym",
            colour: "#ABCDEF",
            budget: 0
        }).expect(422, {
            errors: [
                "A category with that name already exists."
            ]
        }, done);
    });

    it("sends 200 and the category object if the parameters are valid", done => {
        request(app).post("/api/user/category").set("Authorization", `Bearer ${token}`).send({
            type: "expense",
            name: "Expense",
            colour: "#ABCDEF",
            budget: 0
        }).expect(200).end((err, res) => {
            expect(res.body).toHaveProperty("category");
            expect(res.body.category).toHaveProperty("name");
            expect(res.body.category.name).toBe("Expense");
            done();
        });
    });
});

describe("PUT /api/user/category/:id", () => {
    it("sends 401 if the token is not given", done => {
        request(app).put("/api/user/category/x").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).put("/api/user/category/x").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 400 if the required parameters are not given", done => {
        request(app).put("/api/user/category/00000000-0000-0000-0000-000000000000").set("Authorization", `Bearer ${token}`).expect(400, {
            errors: [
                "Type must be income or expense.",
                "Name is required.",
                "Colour must be a hex string."
            ]
        }, done);
    });

    it("sends 400 if the type is expense and the budget is non-negative", done => {
        request(app).put("/api/user/category/00000000-0000-0000-0000-000000000000").set("Authorization", `Bearer ${token}`).send({
            type: "expense",
            name: "Expense",
            colour: "#ABCDEF",
            budget: -1
        }).expect(400, {
            errors: [
                "Budget must be non-negative."
            ]
        }, done);
    });

    it("sends 404 if a category with the id does not exist", done => {
        request(app).put("/api/user/category/00000000-0000-0000-0000-000000000000").set("Authorization", `Bearer ${token}`).send({
            type: "expense",
            name: "Expense",
            colour: "#ABCDEF",
            budget: 0
        }).expect(404, {
            errors: [
                "A category with that id does not exist."
            ]
        }, done);
    });

    it("sends 422 if a category with the name already exists", done => {
        request(app).put(`/api/user/category/${categoryId}`).set("Authorization", `Bearer ${token}`).send({
            type: "expense",
            name: "Gym",
            colour: "#ABCDEF",
            budget: 0
        }).expect(422, {
            errors: [
                "A category with that name already exists."
            ]
        }, done);
    });

    it("sends 200 and the category object if the parameters are valid", done => {
        request(app).put(`/api/user/category/${categoryId}`).set("Authorization", `Bearer ${token}`).send({
            type: "expense",
            name: "Music",
            colour: "#ABCDEF",
            budget: 0
        }).expect(200).end((err, res) => {
            expect(res.body).toHaveProperty("category");
            expect(res.body.category).toHaveProperty("name");
            expect(res.body.category.name).toBe("Music");
            done();
        });
    });
});

describe("DELETE /api/user/category/:id", () => {
    it("sends 401 if the token is not given", done => {
        request(app).delete("/api/user/category/x").expect(401, {
            errors: ["No authorization token."]
        }, done);
    });

    it("sends 401 if the token is invalid", done => {
        request(app).delete("/api/user/category/x").set("Authorization", "Bearer x").expect(401, {
            errors: ["Invalid token."]
        }, done);
    });

    it("sends 400 if the id is invalid", done => {
        request(app).delete("/api/user/category/x").set("Authorization", `Bearer ${token}`).expect(400, {
            errors: ["Invalid id."]
        }, done);
    });

    it("sends 404 if a category with the id does not exist", done => {
        request(app).delete("/api/user/category/00000000-0000-0000-0000-000000000000").set("Authorization", `Bearer ${token}`).expect(404, {
            errors: ["A category with that id does not exist."]
        }, done);
    });

    it("sends 204 if the token is valid", done => {
        request(app).delete(`/api/user/category/${categoryId}`).set("Authorization", `Bearer ${token}`).expect(204, done);
    });
});
