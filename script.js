document.addEventListener("DOMContentLoaded", function() {
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

  // Helper function to calculate the number of vacation days left
  function updateCounter() {
  const selectedDays = document.querySelectorAll(".day.selected");
  const counter = document.getElementById("counter");
  const totalVacationDays = 23; // Set your total vacation days here
  const remainingDays = totalVacationDays - selectedDays.length;
  counter.textContent = `${remainingDays} days left`;

  // Lock the selection if all vacation days are used
  if (remainingDays === 0) {
  const unselectedDays = document.querySelectorAll(".day:not(.selected)");
  unselectedDays.forEach((day) => {
    day.classList.add("disabled");
  });
  } else {
  const lockedDays = document.querySelectorAll(".day.disabled");
  lockedDays.forEach((day) => {
    day.classList.remove("disabled");
  });
  }
  }

  // Function to check if a date is in the past
  function isPastDate(year, month, day) {
  const date = new Date(year, month - 1, day);
  const currentDate = new Date();
  return date < currentDate;
  }

  // Function to handle day selection
  function handleDayClick(event) {
  const day = event.target;
  if (!day.classList.contains("disabled") && !day.classList.contains("empty-day")) {
  day.classList.toggle("selected");
  updateCounter();
  }
  }

  // Function to get the day of the week (0 for Monday, 1 for Tuesday, ..., 6 for Sunday)
  function getDayOfWeek(year, month, day) {
  const dayIndex = new Date(year, month - 1, day).getDay();
  return dayIndex === 0 ? 6 : dayIndex - 1;
  }

  // List of Portuguese holidays
  const portugueseHolidays = [
  "2024-01-01", // New Year's Day
  "2024-02-13", // Good Friday
  "2024-03-29", // Good Friday
  "2024-04-25", // Liberation Day
  "2024-05-01", // Labor Day
  "2024-06-10", // Portugal Day
  "2024-06-13", // Saint Anthony's Day
  "2024-05-30", // Corpus Christi
  "2024-08-15", // Assumption Day
  "2024-10-05", // Republic Day
  "2024-11-01", // All Saints' Day
  "2024-12-01", // Restoration of Independence
  "2024-12-08", // Immaculate Conception
  "2024-12-25", // Christmas Day
  ];

  // Function to check if a date is a holiday
  function isHoliday(year, month, day) {
  const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return portugueseHolidays.includes(date);
  }

  // Generate the calendar
  function generateCalendar() {
  const calendar = document.getElementById("calendar");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  

  const currentMonthContainer = document.querySelector(`.month[data-month="${currentMonth}"]`);
  if (currentMonthContainer) {
  const offset = currentMonthContainer.offsetTop;

  // Scroll to the current month with smooth behavior
  window.scrollTo({
    top: offset,
    behavior: 'smooth'
  });
  }

  // Loop through each month
  for (let month = 1; month <= 12; month++) {
  const monthName = new Date(currentYear, month - 1, 1).toLocaleString('default', { month: 'long' });
  const monthContainer = document.createElement("div");
  monthContainer.classList.add("month");
  monthContainer.dataset.month = month; // Set the data-month attribute
  calendar.appendChild(monthContainer);

  // Add month name
  const monthHeader = document.createElement("div");
  monthHeader.textContent = monthName;
  monthHeader.classList.add("month-header");
  monthContainer.appendChild(monthHeader);

  // Add day names
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // Start from Monday
  const dayNamesContainer = document.createElement("div");
  dayNamesContainer.classList.add("day-names-container"); // New container for day names
  for (let dayName of daysOfWeek) {
    const dayNameElement = document.createElement("div");
    dayNameElement.textContent = dayName;
    dayNamesContainer.appendChild(dayNameElement);
  }
  monthContainer.appendChild(dayNamesContainer);

  // Add days grid container
  const daysContainer = document.createElement("div");
  daysContainer.classList.add("days-container"); // New container for days grid

  const firstDayOfMonth = getDayOfWeek(currentYear, month, 1);
  const lastDayOfMonth = new Date(currentYear, month, 0).getDate();

  // Adjust for ISO weekday convention (add 1 if it's Sunday)
  const dayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth;

  for (let i = 0; i < dayOffset; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("day", "empty-day");
    daysContainer.appendChild(emptyDay);
  }

  for (let day = 1; day <= lastDayOfMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    dayElement.classList.add("day");

    // Check if the day is today and add the "today" class
    if (currentYear === currentYear && month === currentMonth && day === currentDay) {
      dayElement.classList.add("today");
    }

    // Check if the day is before today and add the "past-day" class
    if (currentYear === currentYear && month === currentMonth && day < currentDay) {
      dayElement.classList.add("past-day");
    } else if (currentYear === currentYear && month < currentMonth) {
      dayElement.classList.add("past-day");
    } else if (currentYear < currentYear) {
      dayElement.classList.add("past-day");
    }

    // Check if the day is in the past
    if (isPastDate(currentYear, month, day)) {
      dayElement.classList.add("disabled");
    }

    // Check if the day is a holiday
    if (isHoliday(currentYear, month, day)) {
      dayElement.classList.add("holiday");
    }

    dayElement.addEventListener("click", handleDayClick);
    daysContainer.appendChild(dayElement);
  }

  monthContainer.appendChild(daysContainer);
  }
  }

    // Call the scroll function when the page loads
    window.addEventListener('load', scrollToCurrentMonth);

    // Delay scrolling to the current month to ensure everything is ready
    setTimeout(function() {
      generateCalendar();
      updateCounter();
    }, 500); // Adjust the delay (in milliseconds) as needed


    // Get the input and button elements
const totalDaysInput = document.getElementById("total-days-input");
const updateDaysButton = document.getElementById("update-days-button");
const counter = document.getElementById("counter");

// Add an event listener to the button
updateDaysButton.addEventListener("click", function () {
  // Get the total days entered by the user
  const totalDays = parseInt(totalDaysInput.value);
  const totalVacationDays = parseInt(totalDaysInput.value);

  if (!isNaN(totalDays)) {
    // Update the "days left" based on user input
    const selectedDays = document.querySelectorAll(".day.selected");
    const remainingDays = totalDays - selectedDays.length;
    counter.textContent = `${remainingDays} days left`;
    const totalVacationDays = `${remainingDays}`; // Reset vacation days with user input
  } else {
    alert("Please enter a valid number for total days.");
  }
});



});

