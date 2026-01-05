import {
  loadWorkouts,
  getLastEntry,
  addEntry,
  STORAGE_KEY,
} from "./storage.js";

loadWorkouts();

// Gym/Home toggle
const toggle = document.getElementById("locationToggle");
toggle.addEventListener("change", () => {
  document.body.classList.toggle("home", toggle.checked);
});

// Show last weight + open modal
document.querySelectorAll(".exercise").forEach((el) => {
  const id = el.dataset.id;
  const last = getLastEntry(id);
  el.querySelector(".last").textContent = last ? `Last: ${last.weight}` : "—";

  el.addEventListener("click", () => {
    const logModal = document.getElementById("logModal");
    const modalTitle = document.getElementById("modalTitle");
    const lastEntry = document.getElementById("lastEntry");

    modalTitle.textContent = el.childNodes[0].textContent.trim();
    lastEntry.textContent = last ? `Last: ${last.weight}` : "First time";
    logModal.hidden = false;
    logModal.classList.add("open");

    window.currentExercise = id; // global ref
  });
});

// Save modal entry
document.getElementById("saveBtn").addEventListener("click", () => {
  const id = window.currentExercise;
  addEntry(id, {
    date: new Date().toISOString().split("T")[0],
    weight: document.getElementById("weightInput").value,
    sets: document.getElementById("setsInput").value,
    reps: document.getElementById("repsInput").value,
    notes: document.getElementById("notesInput").value,
  });
  location.reload();
});

// Export
document.getElementById("exportBtn").addEventListener("click", () => {
  const data = localStorage.getItem(STORAGE_KEY);
  const blob = new Blob([data], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "gym-tracker-backup.json";
  a.click();
});

// Import
document.getElementById("importInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem(STORAGE_KEY, reader.result);
    location.reload();
  };
  reader.readAsText(file);
});
