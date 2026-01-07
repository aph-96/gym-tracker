let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const grid = document.getElementById("calendarGrid");
const label = document.getElementById("monthLabel");

document.getElementById("prevMonth").onclick = () => changeMonth(-1);
document.getElementById("nextMonth").onclick = () => changeMonth(1);

function changeMonth(offset) {
  currentMonth += offset;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

renderCalendar();

function renderCalendar() {
  grid.innerHTML = "";
  const data = loadAppData();
  const workouts = data.workouts;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  label.textContent = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long", year: "numeric" }
  );

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    grid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    const workout = workouts[dateKey];

    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = day;

    if (workout?.locked) {
      const color = WORKOUT_TYPES[workout.type]?.color || "#a855f7";
      cell.style.backgroundColor = color;
      cell.style.color = "#fff";
      cell.onclick = () => {
        localStorage.setItem("viewWorkoutDate", dateKey);
        window.location.href = "workout.html";
      };
    }

    if (dateKey === todayKey()) cell.classList.add("today");
    grid.appendChild(cell);
  }

  // legend
  const legend = document.querySelector(".legend");
  legend.innerHTML = "";
  Object.entries(WORKOUT_TYPES).forEach(([key, val]) => {
    const item = document.createElement("div");
    item.className = "legend-item";
    item.innerHTML = `<span class="dot" style="background:${val.color}"></span>${val.label}`;
    legend.appendChild(item);
  });
}
