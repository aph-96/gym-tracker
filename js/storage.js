export const STORAGE_KEY = "gymTracker.workouts.v1";
let workoutHistory = {};

export function loadWorkouts() {
  const saved = localStorage.getItem(STORAGE_KEY);
  workoutHistory = saved ? JSON.parse(saved) : {};
}

export function getLastEntry(id) {
  const h = workoutHistory[id];
  return h ? h[h.length - 1] : null;
}

export function addEntry(id, entry) {
  if (!workoutHistory[id]) workoutHistory[id] = [];
  workoutHistory[id].push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workoutHistory));
}
