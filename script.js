document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskList = document.getElementById("task-list");
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
        taskInput.value = "";
        saveTasks();
    }
}

function editTask(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector("span").textContent;
    
    li.innerHTML = `
        <input type="text" value="${taskText}">
        <div>
            <button onclick="saveEdit(this)">Save</button>
            <button onclick="cancelEdit(this)">Cancel</button>
        </div>
    `;
    
    li.classList.add("editing");
}

function saveEdit(button) {
    const li = button.parentElement.parentElement;
    const newText = li.querySelector("input").value.trim();

    if (newText) {
        li.innerHTML = `
            <span>${newText}</span>
            <div>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        
        li.classList.remove("editing");
        saveTasks();
    }
}

function cancelEdit(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector("input").value.trim();

    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    
    li.classList.remove("editing");
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById("task-list");
    const tasks = [];
    
    taskList.querySelectorAll("li").forEach(li => {
        const taskText = li.querySelector("span").textContent;
        tasks.push(taskText);
    });
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("task-list");

    tasks.forEach(taskText => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button onclick="editTask(this)"style=">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}
