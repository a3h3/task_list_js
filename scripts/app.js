const todoTaskInput = document.getElementById("todoTaskInput");
const stautsInput = document.getElementById("stautsInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const updateTaskBtn = document.getElementById("updateTaskBtn");
const tasksContainer = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to display tasks =========================================================================
function displayTasks(tasks) {
  const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  const filteredTasks = tasks.filter(task => task.task_name.toLowerCase().includes(searchInput));
  const showData = document.getElementById("showData");
  showData.innerHTML = "";
  filteredTasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${task.task_name}</td>
                    <td>${task.status === "1" ? "Pending" : task.status === "2" ? "Processing" : "Done"}</td>
                    <td><button onclick="editTask(${index})"><i class="fas fa-edit editBtn"></i></button></td>
                    <td><button onclick="deleteTask(${index})"><i class="fas fa-trash deleteBtn"></i></button></td>
                `;
    showData.appendChild(row);
  });
}

// Function to add a new task =========================================================================
function addTask() {
  const newTask = {
    task_name: todoTaskInput.value.trim(),
    status: stautsInput.value
  };
  tasksContainer.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasksContainer));
  displayTasks(tasksContainer);
  clearInputs();
}

// Function to update a task =========================================================================
function updateTask() {
  const taskId = updateTaskBtn.dataset.id;
  tasksContainer[taskId].task_name = todoTaskInput.value.trim();
  tasksContainer[taskId].status = stautsInput.value;
  localStorage.setItem("tasks", JSON.stringify(tasksContainer));
  displayTasks(tasksContainer);
  clearInputs();
  updateTaskBtn.classList.add("deactive");
  addTaskBtn.classList.remove("deactive");
}

// Function to edit a task =========================================================================
function editTask(index) {
  const task = tasksContainer[index];
  todoTaskInput.value = task.task_name;
  stautsInput.value = task.status;
  updateTaskBtn.dataset.id = index;
  updateTaskBtn.classList.remove("deactive");
  addTaskBtn.classList.add("deactive");
}

// Function to delete a task =========================================================================
function deleteTask(index) {
  tasksContainer.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksContainer));
  displayTasks(tasksContainer);
}

// Function to clear input fields =========================================================================
function clearInputs() {
  todoTaskInput.value = "";
  stautsInput.value = "";
}

// Event listeners ==================================================================================
addTaskBtn.addEventListener("click", addTask);
updateTaskBtn.addEventListener("click", updateTask);
document.getElementById("searchInput").addEventListener("input", () => displayTasks(tasksContainer));

// Initial display of tasks =========================================================================
displayTasks(tasksContainer);