const today = todayKey();
const mode = localStorage.getItem("selectedMode") || "gym";
const type = localStorage.getItem("selectedWorkoutType") || "push";
let editingExerciseId = null;

// Templates: main exercises per type
const MAIN_WORKOUTS = {
  push: ["bench_press", "incline_press", "lateral_raise", "front_raise"],
  pull: ["lat_pulldown", "seated_row", "db_row", "face_pull"],
  legs: ["leg_press", "romanian_deadlift", "walking_lunges", "leg_curl"],
  glutes: ["glute_bridge", "cable_kickback", "abductor_machine"],
  core: ["weighted_dead_bug", "plank_taps", "russian_twist", "woodchop"],
  upper: ["shoulder_press", "front_lateral_combo"],
  lower: ["goblet_squat", "banded_crab_walk"],
};

// --- Initialize today's workout if empty ---
updateAppData((data) => {
  if (!data.workouts[today]) {
    data.workouts[today] = { type, mode, locked: false, exercises: [] };

    // pre-populate main workout
    MAIN_WORKOUTS[type].forEach((exId) => {
      data.workouts[today].exercises.push({
        exerciseId: exId,
        sets: [],
        completed: false,
      });
    });
  }
});

renderWorkout();

// --- Render the page ---
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

// --- Selected Exercises ---
function renderSelected(workout) {
  const container = document.getElementById("selectedExercises");
  container.innerHTML = "";

  workout.exercises.forEach((e) => {
    const ex = EXERCISES[e.exerciseId];
    const lastSet = e.sets[e.sets.length - 1] || {};
    const prevText = lastSet.weight
      ? `Prev: ${lastSet.weight} kg, ${lastSet.notes || ""}`
      : "No previous";

    const card = document.createElement("div");
    card.className = "exercise-card active";

    card.innerHTML = `
      <div style="flex:1">
        <strong>${ex.name}</strong><br/>
        <small>${prevText}</small>
      </div>
      <div style="display:flex;gap:4px">
        <button onclick="openModal('${e.exerciseId}')">Log</button>
        <button onclick="removeExercise('${e.exerciseId}')">❌</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// --- Remove Exercise ---
function removeExercise(id) {
  updateAppData((data) => {
    const workout = data.workouts[today];
    workout.exercises = workout.exercises.filter((e) => e.exerciseId !== id);
  });
  renderWorkout();
}

// --- Exercise Picker (Add more exercises to today) ---
function renderPicker(workout) {
  const picker = document.getElementById("exercisePicker");
  picker.innerHTML = "";

  // Available exercises filtered by type + mode, not already added
  const available = Object.values(EXERCISES).filter(
    (ex) =>
      ex.type === workout.type &&
      (ex.location === workout.mode || ex.location === "both") &&
      !workout.exercises.some((e) => e.exerciseId === ex.id)
  );

  if (available.length === 0) {
    picker.textContent = "No more exercises available to add.";
    return;
  }

  available.forEach((ex) => {
    const btn = document.createElement("button");
    btn.textContent = "Add " + ex.name;
    btn.style.backgroundColor = WORKOUT_TYPES[type].color;
    btn.onclick = () => addExercise(ex.id);
    picker.appendChild(btn);
  });
}

// --- Add Exercise ---
function addExercise(id) {
  updateAppData((data) => {
    data.workouts[today].exercises.push({
      exerciseId: id,
      sets: [],
      completed: false,
    });
  });
  renderWorkout();
}

// --- Toggle Complete ---
function toggleComplete(id) {
  updateAppData((data) => {
    const e = data.workouts[today].exercises.find((ex) => ex.exerciseId === id);
    e.completed = !e.completed;
  });
  renderWorkout();
}

// --- Complete Workout ---
document.getElementById("completeWorkoutBtn").onclick = () => {
  if (!confirm("Lock workout for today?")) return;
  updateAppData((data) => {
    data.workouts[today].locked = true;
  });
  renderWorkout();
};

// --- Modal ---
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
