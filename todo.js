let tasks = [];
let completedTasks = 0;

function toggleAddButton() {
    const taskInput = document.getElementById("taskInput").value.trim();
    document.getElementById("addTaskBtn").disabled = taskInput === "";
}

document.addEventListener("DOMContentLoaded", toggleAddButton);

function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    const taskList = document.getElementById("taskList");

    if (taskInput.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = taskInput;
        li.classList.add("task-item");

        li.onclick = () => showTaskOptions(li);

        taskList.appendChild(li);
        tasks.push({ element: li, completed: false });

        document.getElementById("taskInput").value = "";
        toggleAddButton();
        updateProgress();
    }
}

function showTaskOptions(task) {
    if (task.classList.contains("completed")) return;
    
    const options = document.createElement("div");
    options.classList.add("task-options");
    
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔ Complete";
    completeBtn.onclick = () => markComplete(task, options);
    
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖ Delete";
    removeBtn.onclick = () => removeTask(task, options);
    
    options.appendChild(completeBtn);
    options.appendChild(removeBtn);
    task.appendChild(options);
}

function removeTask(task, options) {
    if (confirm("Are you sure you want to quit this? 😟")) {
        task.remove();
        tasks = tasks.filter(t => t.element !== task);
        updateProgress();
    } else {
        options.remove();
    }
}

function markComplete(task, options) {
    alert("Hooray! You did it! 🎉 Congratulations!");
    task.classList.add("completed");
    task.appendChild(options);
    completedTasks++;
    updateProgress();
    
    const taskList = document.getElementById("taskList");
    taskList.appendChild(task);
}

function updateProgress() {
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const totalTasks = tasks.length;
    const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    progressFill.style.width = percent + "%";
    progressText.textContent = `Progress: ${percent}%`;
    
    if (percent < 30) {
        progressText.textContent += " - Keep going! 💪";
    } else if (percent < 70) {
        progressText.textContent += " - You're doing great! 🌟";
    } else if (percent < 100) {
        progressText.textContent += " - You're close! Almost there! 🎯";
    } else {
        progressText.textContent += " - Amazing work! You're a star! 🌟🌟";
    }
}