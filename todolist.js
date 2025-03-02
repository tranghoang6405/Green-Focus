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