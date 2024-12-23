document.addEventListener("DOMContentLoaded", function () {
    function getRandomHexColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
        }
      
        function calculateColorBrightness(rgb) {
        const [r, g, b] = rgb;
        return (r * 299 + g * 587 + b * 114) / 1000;
        }
      
        const randomColor = getRandomHexColor();
        document.body.style.backgroundColor = randomColor;
      
        const bgColorRGB = [
        parseInt(randomColor.slice(1, 3), 16),
        parseInt(randomColor.slice(3, 5), 16),
        parseInt(randomColor.slice(5, 7), 16)
        ];
      
        const brightness = calculateColorBrightness(bgColorRGB);
      
        const textColor = brightness > 159 ? 'black' : 'white';
      
        // Apply the calculated text color and opacity to week day labels
        document.querySelectorAll('.day-names-container div').forEach(weekDayLabel => {
        weekDayLabel.style.color = textColor;
        });
      
        // Set the color of the past day circles to the opposite color of the text
        const oppositeColor = textColor === 'black' ? 'white' : 'black';
        document.querySelectorAll('.day.past-day').forEach(pastDay => {
        pastDay.style.color = oppositeColor;
        pastDay.style.backgroundColor = textColor;
        });
      
        document.querySelectorAll('.month').forEach(month => {
        month.style.backgroundColor = oppositeColor;
        });
      
        // Apply the calculated text color to various elements
        document.body.style.color = textColor;
        document.querySelector('h1').style.color = textColor;
      
        // Get the navigation bar element
        const navbar = document.getElementById('navbar');
      
        // Detect when the user scrolls
        window.addEventListener('scroll', () => {
        // Check if the user has scrolled down more than 10 pixels
        if (window.scrollY > 10) {
        // If yes, fix the navigation bar at the top with a smoother transition
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.transition = 'position 0.3s ease-in-out'; // Smooth transition for position
        } else {
        // If no, reset the navigation bar's position and transition
        navbar.style.position = 'relative';
        navbar.style.top = 'auto';
        navbar.style.transition = 'none'; // Remove transition
        }
        });
      
        // Function to scroll to the current month
        function scrollToCurrentMonth() {
        const currentMonthContainer = document.querySelector('.month.today');
        if (currentMonthContainer) {
        const offset = currentMonthContainer.offsetTop;
      
        // Scroll to the current month with smooth behavior
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
        }
        }
      
        // Call the scroll function when the page loads
        window.addEventListener('load', scrollToCurrentMonth);

        // Helper function to get the current date in 'YYYY-MM-DD' format
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
    }

        //////////////////////////////////////////////// 


    let currentYear = new Date().getFullYear(); // Store the current year globally
  
    // Generate the calendar for a given year
    function generateCalendar(year) {
      const calendar = document.getElementById("calendar");
      calendar.innerHTML = ""; // Clear the previous calendar
  
      for (let month = 1; month <= 12; month++) {
        const monthName = new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' });
        const monthContainer = document.createElement("div");
        monthContainer.classList.add("month");
  
        // Add month name
        const monthHeader = document.createElement("div");
        monthHeader.textContent = monthName;
        monthHeader.classList.add("month-header");
        monthContainer.appendChild(monthHeader);
  
        // Add day names
        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const dayNamesContainer = document.createElement("div");
        dayNamesContainer.classList.add("day-names-container");
        for (let dayName of daysOfWeek) {
          const dayNameElement = document.createElement("div");
          dayNameElement.textContent = dayName;
          dayNamesContainer.appendChild(dayNameElement);
        }
        monthContainer.appendChild(dayNamesContainer);
  
        // Add days grid
        const daysContainer = document.createElement("div");
        daysContainer.classList.add("days-container");
        const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        const emptyDays = (firstDayOfMonth + 6) % 7; // Adjust to start on Monday
  
        for (let i = 0; i < emptyDays; i++) {
          const emptyDay = document.createElement("div");
          emptyDay.classList.add("day", "empty-day");
          daysContainer.appendChild(emptyDay);
        }
  
        for (let day = 1; day <= lastDayOfMonth; day++) {
          const dayElement = document.createElement("div");
          dayElement.textContent = day;
          dayElement.classList.add("day");
  
          // Highlight today's date
          const today = new Date();
          if (year === today.getFullYear() && month === today.getMonth() + 1 && day === today.getDate()) {
            dayElement.classList.add("today");
          }
  
          daysContainer.appendChild(dayElement);
        }
  
        monthContainer.appendChild(daysContainer);
        calendar.appendChild(monthContainer);
      }
    }
  
    // Event listener for "Next Year" button
    document.getElementById("next-year-button").addEventListener("click", () => {
      currentYear++;
      generateCalendar(currentYear);
  
      // Toggle button visibility
      document.getElementById("next-year-button").style.display = "none";
      document.getElementById("current-year-button").style.display = "inline";
    });
  
    // Event listener for "Current Year" button
    document.getElementById("current-year-button").addEventListener("click", () => {
      currentYear = new Date().getFullYear();
      generateCalendar(currentYear);
  
      // Toggle button visibility
      document.getElementById("next-year-button").style.display = "inline";
      document.getElementById("current-year-button").style.display = "none";
    });
  
    // Initial calendar generation
    generateCalendar(currentYear);

    
  });
  