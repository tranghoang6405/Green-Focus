// Add scroll-to-top arrow functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create the arrow 
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = '&#8679;'; 
    document.body.appendChild(scrollTopBtn);
    
    // Initially hide the button
    scrollTopBtn.style.display = 'none';
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // Smooth scroll to top when clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Initialize the tasks object to store tasks by date
let tasks = {};

let currentMonth = 0; // January (0-based index)
let currentYear = 2025; // Starting year

// Define specific task options for each category
const taskOptions = {
    schoolwork: ["MATH 1550H", "MATH 2600H", "COIS 2750H", "COIS 2400H", "COIS 3380H", "COIS 3560H", "French Study"],
    hobbies: ["Clay", "Painting", "Reading"]
};

// Load tasks from localStorage if available
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addTaskButton').addEventListener('click', addPoint);

    if (localStorage.getItem('calendarTasks')) {
        tasks = JSON.parse(localStorage.getItem('calendarTasks'));

        if (typeof tasks !== 'object' || tasks === null) {
            tasks = {}; // Reset tasks if it's not an object
        }

        for (const date in tasks) {
            if (!Array.isArray(tasks[date])) {
                tasks[date] = []; // Ensure each date key points to an array
            }
        }
    }
    
    // Update the task type dropdown to also handle the subject selection
    updateTaskDropdowns();
    
    // Generate and display the calendar immediately
    generateCalendar();
});

// Function to update the dropdowns based on the selected category
function updateTaskDropdowns() {
    const taskTypeSelect = document.getElementById('taskType');
    const taskSubjectSelect = document.getElementById('taskSubject');
    
    // Clear existing options
    taskSubjectSelect.innerHTML = '';
    
    // Get the selected category
    const selectedCategory = taskTypeSelect.value;
    
    // Add options based on the selected category
    taskOptions[selectedCategory].forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        taskSubjectSelect.appendChild(optionElement);
    });
}

// Function to add a task box
function addPoint() {
    const dateInput = document.getElementById('dateInput').value;
    const taskType = document.getElementById('taskType').value;
    const taskSubject = document.getElementById('taskSubject').value;

    if (!dateInput) {
        alert('Please select a date');
        return;
    }

    if (!taskType || !taskOptions.hasOwnProperty(taskType)) {
        alert('Please select a valid task type');
        return;
    }

    if (!taskSubject) {
        alert('Please select a task subject');
        return;
    }

    // Initialize the date in tasks object if it doesn't exist
    if (!tasks[dateInput]) {
        tasks[dateInput] = [];
    }

    // Double-check that tasks[dateInput] is an array
    if (!Array.isArray(tasks[dateInput])) {
        tasks[dateInput] = []; // Reset to an array if it's not
    }

    // Add the new task with type and subject
    tasks[dateInput].push({
        type: taskType,
        subject: taskSubject
    });

    // Save to localStorage
    localStorage.setItem('calendarTasks', JSON.stringify(tasks));

    // Regenerate the calendar to display the new task
    generateCalendar();
}

// Function to generate the calendar for the current month
function generateCalendar() {
    const calendarView = document.getElementById('calendarView');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Clear previous calendar
    calendarView.innerHTML = '';
    
    // Create month header
    const monthNames = ["January", "February", "March", "April", "May", "June",
                         "July", "August", "September", "October", "November", "December"];
    const monthHeader = document.createElement('h3');
    monthHeader.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    calendarView.appendChild(monthHeader);
    
    // Create calendar grid
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';
    
    // Add day headers
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get the first day of the month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)
    
    // Get the last day of the month
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        
        // Add day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);
        
        // Format the date string to match the format from the date input (YYYY-MM-DD)
        const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        
        // Add task boxes if there are any for this date
        if (tasks[dateStr] && tasks[dateStr].length > 0) {
            const tasksContainer = document.createElement('div');
            tasksContainer.className = 'task-boxes';
            
            // Add task boxes for this date
            tasks[dateStr].forEach(task => {
                const taskBox = document.createElement('div');
                taskBox.className = `task-box ${task.type}`;
                taskBox.textContent = task.subject;
                
                // Add a delete button
                const deleteBtn = document.createElement('span');
                deleteBtn.className = 'delete-task';
                deleteBtn.innerHTML = '&times;';
                deleteBtn.onclick = function(e) {
                    e.stopPropagation();
                    removeTask(dateStr, task);
                };
                
                taskBox.appendChild(deleteBtn);
                tasksContainer.appendChild(taskBox);
            });
            
            dayCell.appendChild(tasksContainer);
        }
        
        // Highlight today
        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            dayCell.classList.add('today');
        }
        
        calendarGrid.appendChild(dayCell);
    }
    
    calendarView.appendChild(calendarGrid);
    
    // Add a legend
    const legend = document.createElement('div');
    legend.className = 'calendar-legend';
    legend.innerHTML = `
        <div class="legend-item">
            <div class="legend-box schoolwork"></div>
            <span>Schoolwork</span>
        </div>
        <div class="legend-item">
            <div class="legend-box hobbies"></div>
            <span>Hobbies</span>
        </div>
    `;
    calendarView.appendChild(legend);
}

// Function to remove a specific task
function removeTask(dateStr, taskToRemove) {
    if (!tasks[dateStr]) return; // Add this check

    const index = tasks[dateStr].findIndex(task => 
        task.type === taskToRemove.type && task.subject === taskToRemove.subject);
    
    if (index !== -1) {
        tasks[dateStr].splice(index, 1);
        
        if (tasks[dateStr].length === 0) {
            delete tasks[dateStr];
        }
        
        localStorage.setItem('calendarTasks', JSON.stringify(tasks));
        generateCalendar();
    }
}

// Function to reset all tasks (useful for testing)
function resetTasks() {
    tasks = {};
    localStorage.removeItem('calendarTasks');
    generateCalendar();
}