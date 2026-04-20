import request from "supertest";
import app from "../src/app.js";

describe("GET /api/status", () => {
  it("returns system status", async () => {
    const res = await request(app).get("/api/status");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("ok");
  });
});

