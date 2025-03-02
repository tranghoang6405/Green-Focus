function addPoint() {
    const dateInput = document.getElementById("dateInput").value;
    const taskType = document.getElementById("taskType").value;
    const calendarView = document.getElementById("calendarView");

    if (dateInput) {
        const newEntry = document.createElement("p");
        newEntry.textContent = `${dateInput}: ${taskType === 'schoolwork' ? '📚' : '🎨'}`;
        newEntry.style.color = taskType === 'schoolwork' ? "blue" : "green";
        calendarView.appendChild(newEntry);
    }
}