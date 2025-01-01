document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("total-days-input").addEventListener("input", updateVacationDays);

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
        document.querySelector('input').style.color = oppositeColor;
        document.querySelector('input').style.borderColor = textColor;
        document.querySelector('input').style.backgroundColor = randomColor;
        document.querySelector('input').style.opacity = "0.7";
        document.querySelector('input').style.mixBlendMode = "lighten";

      
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
        
        
///////////////////////////////NEW CODE


    let currentYear = new Date().getFullYear(); // Track the current year globally
    const holidays = {
      [currentYear]: [
        `${currentYear}-01-01`, // New Year's Day
        `${currentYear}-03-04`, // Carnaval >>>>> Móvel
        `${currentYear}-04-18`, // Sexta Feira Santa >>>>> Móvel
        `${currentYear}-04-25`, // Liberation Day
        `${currentYear}-05-01`, // Labor Day
        `${currentYear}-06-10`, // Portugal Day
        `${currentYear}-06-13`, // Santo António Day (Lisbon)
        `${currentYear}-06-19`, // Corpus Cristi >>>>> Móvel
        `${currentYear}-08-15`, // Assumption Day
        `${currentYear}-10-05`, // Republic Day
        `${currentYear}-11-01`, // All Saints' Day
        `${currentYear}-12-01`, // Restoration of Independence
        `${currentYear}-12-08`, // Immaculate Conception
        `${currentYear}-12-25`, // Christmas Day
      ],
      [currentYear + 1]: [
        `${currentYear + 1}-01-01`, // New Year's Day
        `${currentYear + 1}-03-04`, // Carnaval >>>>> Móvel
        `${currentYear + 1}-04-18`, // Sexta Feira Santa >>>>> Móvel
        `${currentYear + 1}-04-25`, // Liberation Day
        `${currentYear + 1}-05-01`, // Labor Day
        `${currentYear + 1}-06-10`, // Portugal Day
        `${currentYear + 1}-06-13`, // Santo António Day (Lisbon)
        `${currentYear + 1}-06-19`, // Corpus Cristi >>>>> Móvel
        `${currentYear + 1}-08-15`, // Assumption Day
        `${currentYear + 1}-10-05`, // Republic Day
        `${currentYear + 1}-11-01`, // All Saints' Day
        `${currentYear + 1}-12-01`, // Restoration of Independence
        `${currentYear + 1}-12-08`, // Immaculate Conception
        `${currentYear + 1}-12-25`, // Christmas Day
      ],
    };
  
//////////////////////////////////NEW CODE
    //let totalVacationDays = document.getElementById("total-days-input").value; // Default vacation days

    let totalVacationDays = 22; // Default value

    function updateVacationDays() {
      const userInput = parseInt(document.getElementById("total-days-input").value, 10); // Get user input as an integer
    
      if (!isNaN(userInput) && userInput !== 22) { 
        // If the input is a valid number and not 22, update totalVacationDays
        totalVacationDays = userInput;
      } else {
        // If the input is not valid or is 22, reset to the default value
        totalVacationDays = 22;
      }
    }
    

    //////////////////////////////////OLD CODE
    const calendar = document.getElementById("calendar");
    const totalDaysInput = document.getElementById("total-days-input");
    const updateDaysButton = document.getElementById("update-days-button");
    const counter = document.getElementById("counter");
  
    // Function to generate calendar
    function generateCalendar(year) {
      calendar.innerHTML = ""; // Clear previous calendar
      for (let month = 1; month <= 12; month++) {
        const monthName = new Date(year, month - 1, 1).toLocaleString("default", { month: "long" });
        const monthContainer = document.createElement("div");
        monthContainer.classList.add("month");
  
        // Add month header
        const monthHeader = document.createElement("div");
        monthHeader.textContent = monthName;
        monthHeader.classList.add("month-header");
        monthContainer.appendChild(monthHeader);
  
        // Add day names
        const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const dayNamesContainer = document.createElement("div");
        dayNamesContainer.classList.add("day-names-container");
        for (const dayName of daysOfWeek) {
          const dayNameElement = document.createElement("div");
          dayNameElement.textContent = dayName;
          dayNamesContainer.appendChild(dayNameElement);
        }
        monthContainer.appendChild(dayNamesContainer);
  
        // Add days
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
  
          const today = new Date();
          const fullDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  
          // Highlight today's date
          if (
            year === today.getFullYear() &&
            month === today.getMonth() + 1 &&
            day === today.getDate()
          ) {
            dayElement.classList.add("today");
          }
  
          // Highlight holidays
          if (holidays[year] && holidays[year].includes(fullDate)) {
            dayElement.classList.add("holiday");
          }
  
          // Handle day selection
          dayElement.addEventListener("click", function () {
            if (!dayElement.classList.contains("disabled")) {
              dayElement.classList.toggle("selected");
              updateCounter();
            }
          });
  
          daysContainer.appendChild(dayElement);
        }
  
        monthContainer.appendChild(daysContainer);
        calendar.appendChild(monthContainer);
      }
    }
  
    // Update the "days left" counter
    function updateCounter() {
      const selectedDays = document.querySelectorAll(".day.selected");
      const remainingDays = totalVacationDays - selectedDays.length;
      counter.textContent = `${remainingDays} days left`;
  
      // Lock further selection if all vacation days are used
      const unselectedDays = document.querySelectorAll(".day:not(.selected)");
      unselectedDays.forEach((day) => {
        if (remainingDays === 0) {
          day.classList.add("disabled");
        } else {
          day.classList.remove("disabled");
        }
      });
    }
  
    // Update total vacation days based on user input
    updateDaysButton.addEventListener("click", () => {
      const newTotalDays = parseInt(totalDaysInput.value);
      if (!isNaN(newTotalDays) && newTotalDays > 0) {
        totalVacationDays = newTotalDays;
        updateCounter();
      } else {
        alert("Please enter a valid number of vacation days.");
      }
    });
  
    // Toggle between current year and next year
    document.getElementById("next-year-button").addEventListener("click", () => {
      currentYear++;
      generateCalendar(currentYear);
      toggleYearButtons();
    });
  
    document.getElementById("current-year-button").addEventListener("click", () => {
      currentYear = new Date().getFullYear();
      generateCalendar(currentYear);
      toggleYearButtons();
    });
  
    // Toggle visibility of year navigation buttons
    function toggleYearButtons() {
      const nextYearButton = document.getElementById("next-year-button");
      const currentYearButton = document.getElementById("current-year-button");
      const yearTitle = document.getElementById("year-title");
      const yearGroup = document.getElementById("toggle-year-btn");
      if (currentYear === new Date().getFullYear()) {
        yearGroup.style.left = "50px";
        nextYearButton.style.display = "flex";
        nextYearButton.style.flexDirection = "row";
        currentYearButton.style.display = "none";
        yearTitle.textContent = `${currentYear}`;
        
      } else {
        yearGroup.style.left= "-50px";
        nextYearButton.style.display = "none";
        currentYearButton.style.display = "flex";
        currentYearButton.style.flexDirection = "row-reverse";
        yearTitle.textContent = `${currentYear}`;
      }
    }

///////////////////////////////OLD CODE


      // Function to check if a date is in the past
    function isPastDate(year, month, day) {
        const date = new Date(year, month - 1, day);
        const currentDate = new Date();
        return date < currentDate;
        }

///////////////////////////////NEW CODE
  
    // Initialize
    generateCalendar(currentYear);
    updateCounter();
    toggleYearButtons();
  });

