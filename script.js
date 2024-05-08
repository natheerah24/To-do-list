window.onload = loadTasks;

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const list = document.querySelector("ul");
  tasks.forEach((task) => {
    list.appendChild(createTaskElement(task));
  });
}

function addTask() {
  const taskInput = document.querySelector("form input");
  const taskValue = taskInput.value.trim();
  if (taskValue === "") {
    alert("Please add a task!");
    return;
  }
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (tasks.some((t) => t.task === taskValue)) {
    alert("Task already exists!");
    return;
  }
  tasks.push({ task: taskValue, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  const list = document.querySelector("ul");
  list.appendChild(createTaskElement({ task: taskValue, completed: false }));
  taskInput.value = "";
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" class="check" ${task.completed ? "checked" : ""}>
    <input type="text" value="${task.task}" class="task ${task.completed ? "completed" : ""}">
    <i class="fa fa-trash"></i>
  `;
  li.querySelector(".check").addEventListener("click", () => {
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.querySelector(".task").classList.toggle("completed");
  });
  li.querySelector(".fa-trash").addEventListener("click", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const index = tasks.findIndex((t) => t.task === task.task);
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.remove();
  });
  return li;
}

function sortList() {
  const list = document.querySelector("ul");
  Array.from(list.children)
    .sort((a, b) => a.querySelector(".task").value.localeCompare(b.querySelector(".task").value))
    .forEach((li) => list.appendChild(li));
}
