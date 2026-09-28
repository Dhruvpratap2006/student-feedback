const express = require("express");
const path = require("path");

const app = express();
const feedbacks = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/feedback", (req, res) => {
  res.json(feedbacks);
});

app.post("/api/feedback", (req, res) => {
  const { name, course, feedback } = req.body || {};
  if (![name, course, feedback].every((v) => typeof v === "string" && v.trim())) {
    return res.status(400).json({ error: "name, course and feedback are required" });
  }
  const entry = {
    name: name.trim(),
    course: course.trim(),
    feedback: feedback.trim(),
    createdAt: new Date().toISOString(),
  };
  feedbacks.unshift(entry);
  res.status(201).json(entry);
});

app.get("/health", (req, res) => res.send("ok"));

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Running on http://localhost:${port}`));
}

module.exports = app;
