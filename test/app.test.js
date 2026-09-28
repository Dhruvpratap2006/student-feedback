const test = require("node:test");
const assert = require("node:assert");
const app = require("../server");

let server;
let base;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = `http://localhost:${server.address().port}`;
});

test.after(() => server.close());

test("health check works", async () => {
  const res = await fetch(base + "/health");
  assert.strictEqual(res.status, 200);
});

test("rejects empty feedback", async () => {
  const res = await fetch(base + "/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "", course: "CSE", feedback: "" }),
  });
  assert.strictEqual(res.status, 400);
});

test("saves and returns feedback", async () => {
  const post = await fetch(base + "/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Dhruv", course: "DSA", feedback: "Great course" }),
  });
  assert.strictEqual(post.status, 201);
  const list = await (await fetch(base + "/api/feedback")).json();
  assert.strictEqual(list[0].name, "Dhruv");
});
