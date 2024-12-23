document.addEventListener("DOMContentLoaded", function () {
    let currentYear = new Date().getFullYear(); // Store the current year
    const nextYear = currentYear + 1; // Calculate the next year
  
    // List of static holidays for each year
    function getHolidaysForYear(year) {
      return [
        `${year}-01-01`, // New Year's Day
        `${year}-04-25`, // Liberation Day
        `${year}-05-01`, // Labor Day
        `${year}-06-10`, // Portugal Day
        `${year}-08-15`, // Assumption Day
        `${year}-10-05`, // Republic Day
        `${year}-11-01`, // All Saints' Day
        `${year}-12-01`, // Restoration of Independence
        `${year}-12-08`, // Immaculate Conception
        `${year}-12-25`, // Christmas Day
      ];
    }
  
    // Combine holidays for current and next year
    const holidays = {
      [currentYear]: getHolidaysForYear(currentYear),
      [nextYear]: getHolidaysForYear(nextYear),
    };
  
    // Function to check if a date is a holiday
    function isHoliday(year, month, day) {
      const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      return holidays[year]?.includes(date);
    }
  
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
  
          // Highlight holidays
          if (isHoliday(year, month, day)) {
            dayElement.classList.add("holiday");
          }
  
          daysContainer.appendChild(dayElement);
        }
  
        monthContainer.appendChild(daysContainer);
        calendar.appendChild(monthContainer);
      }
    }
  
    // Event listener for "Next Year" button
    document.getElementById("next-year-button").addEventListener("click", () => {
      generateCalendar(nextYear);
  
      // Toggle button visibility
      document.getElementById("next-year-button").style.display = "none";
      document.getElementById("current-year-button").style.display = "inline";
    });
  
    // Event listener for "Current Year" button
    document.getElementById("current-year-button").addEventListener("click", () => {
      generateCalendar(currentYear);
  
      // Toggle button visibility
      document.getElementById("next-year-button").style.display = "inline";
      document.getElementById("current-year-button").style.display = "none";
    });
  
    // Initial calendar generation
    generateCalendar(currentYear);
  });
  