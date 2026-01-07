const EXERCISES = {
  bench_press: {
    id: "bench_press",
    name: "Bench Press",
    type: "push",
    location: "gym",
  },
  incline_press: {
    id: "incline_press",
    name: "Incline DB Press",
    type: "push",
    location: "both",
  },
  lateral_raise: {
    id: "lateral_raise",
    name: "Lateral Raise",
    type: "push",
    location: "both",
  },
};

let appData = {
  version: "1.0",
  workouts: {}, // { "YYYY-MM-DD": {type, mode, locked, exercises: [] } }
  exercises: EXERCISES,
};
