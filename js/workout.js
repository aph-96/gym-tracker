const today = todayKey();
const mode = localStorage.getItem("selectedMode");
const type = localStorage.getItem("selectedWorkoutType");

let editingExerciseId = null;

// Initialize today workout
updateAppData((data) => {
  if (!data.workouts[today]) {
    data.workouts[today] = { type, mode, locked: false, exercises: [] };
  }
});

renderWorkout();

function renderWorkout() {
  const data = loadAppData();
  const workout = data.workouts[today];

  document.getElementById(
    "workoutTitle"
  ).textContent = `${WORKOUT_TYPES[type].label} Workout`;

  renderSelected(workout);
  renderPicker(workout);

  document.getElementById("completeWorkoutBtn").disabled = workout.locked;
}

// Render selected exercises
function renderSelected(workout) {
  const container = document.getElementById("selectedExercises");
  container.innerHTML = "";

  workout.exercises.forEach((e) => {
    const ex = EXERCISES[e.exerciseId];

    const card = document.createElement("div");
    card.className = "exercise-card active";

    const prevText = e.sets.length
      ? `Prev: ${e.sets[e.sets.length - 1].weight || "-"} kg, ${
          e.sets[e.sets.length - 1].notes || ""
        }`
      : "No previous";

    card.innerHTML = `
      <strong>${ex.name}</strong><br/>
      <small>${prevText}</small>
      <button onclick="openModal('${e.exerciseId}')">Log</button>
      <button onclick="toggleComplete('${e.exerciseId}')">
        ${e.completed ? "✅ Done" : "Mark Complete"}
      </button>
    `;

    container.appendChild(card);
  });
}

// Render available exercises to add
function renderPicker(workout) {
  const picker = document.getElementById("exercisePicker");
  picker.innerHTML = "";

  const available = Object.values(EXERCISES).filter(
    (ex) =>
      ex.type === workout.type &&
      (ex.location === workout.mode || ex.location === "both")
  );

  available.forEach((ex) => {
    const alreadyAdded = workout.exercises.some((e) => e.exerciseId === ex.id);
    const btn = document.createElement("button");
    btn.textContent = alreadyAdded ? "Added" : "Add";
    btn.disabled = alreadyAdded;
    btn.style.backgroundColor = alreadyAdded
      ? "#555"
      : WORKOUT_TYPES[type].color;
    btn.onclick = () => addExercise(ex.id);
    picker.appendChild(btn);
  });
}

// Add exercise
function addExercise(id) {
  updateAppData((data) => {
    data.workouts[today].exercises.unshift({
      exerciseId: id,
      sets: [],
      completed: false,
    });
  });
  renderWorkout();
}

// Toggle complete
function toggleComplete(id) {
  updateAppData((data) => {
    const ex = data.workouts[today].exercises.find((e) => e.exerciseId === id);
    ex.completed = !ex.completed;
  });
  renderWorkout();
}

// Complete & lock workout
document.getElementById("completeWorkoutBtn").onclick = () => {
  if (!confirm("Lock workout for today?")) return;
  updateAppData((data) => {
    data.workouts[today].locked = true;
  });
  renderWorkout();
};

// Modal logic
const backdrop = document.getElementById("modalBackdrop");
const modal = document.getElementById("logModal");
const modalExercise = document.getElementById("modalExercise");
const modalWeight = document.getElementById("modalWeight");
const modalNotes = document.getElementById("modalNotes");

function openModal(id) {
  editingExerciseId = id;
  const workout = loadAppData().workouts[today];
  const e = workout.exercises.find((ex) => ex.exerciseId === id);
  const last = e.sets[e.sets.length - 1] || {};
  modalExercise.textContent = EXERCISES[id].name;
  modalWeight.value = last.weight || "";
  modalNotes.value = last.notes || "";
  backdrop.classList.add("show");
  modal.classList.add("show");
}

function closeModal() {
  backdrop.classList.remove("show");
  modal.classList.remove("show");
}

function saveModal() {
  const weight = modalWeight.value;
  const notes = modalNotes.value;
  updateAppData((data) => {
    const e = data.workouts[today].exercises.find(
      (ex) => ex.exerciseId === editingExerciseId
    );
    e.sets.push({ weight, notes });
  });
  closeModal();
  renderWorkout();
}
