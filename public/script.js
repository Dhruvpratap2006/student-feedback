const form = document.getElementById("form");
const list = document.getElementById("list");
const msg = document.getElementById("msg");

async function loadFeedback() {
  const res = await fetch("/api/feedback");
  const data = await res.json();
  list.textContent = "";
  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    const title = document.createElement("strong");
    title.textContent = item.name;
    const course = document.createElement("small");
    course.textContent = " | " + item.course;
    const text = document.createElement("p");
    text.textContent = item.feedback;
    card.append(title, course, text);
    list.appendChild(card);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "";
  const body = {
    name: document.getElementById("name").value,
    course: document.getElementById("course").value,
    feedback: document.getElementById("feedback").value,
  };
  const res = await fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    msg.textContent = "Please fill all fields.";
    return;
  }
  form.reset();
  loadFeedback();
});

loadFeedback();
