import * as request from "supertest";
import server from "../src/index";

describe("server", () => {
    afterAll(() => {
        server.close();
    });
});
