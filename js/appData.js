const EXERCISES = {
  // PUSH (Gym)
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
    location: "gym",
  },
  lateral_raise: {
    id: "lateral_raise",
    name: "Lateral Raise",
    type: "push",
    location: "both",
  },
  front_raise: {
    id: "front_raise",
    name: "Front Raise",
    type: "push",
    location: "both",
  },
  chest_fly: {
    id: "chest_fly",
    name: "Cable / DB Chest Fly",
    type: "push",
    location: "gym",
  },
  triceps_extension: {
    id: "triceps_extension",
    name: "Overhead Triceps Extension",
    type: "push",
    location: "both",
  },
  triceps_pushdown: {
    id: "triceps_pushdown",
    name: "Triceps Rope Pushdown",
    type: "push",
    location: "gym",
  },
  arnold_press: {
    id: "arnold_press",
    name: "Arnold Press",
    type: "push",
    location: "both",
  },

  // PULL (Gym)
  lat_pulldown: {
    id: "lat_pulldown",
    name: "Lat Pulldown",
    type: "pull",
    location: "gym",
  },
  seated_row: {
    id: "seated_row",
    name: "Seated Cable Row",
    type: "pull",
    location: "gym",
  },
  db_row: {
    id: "db_row",
    name: "Chest-Supported DB Row",
    type: "pull",
    location: "gym",
  },
  face_pull: {
    id: "face_pull",
    name: "Face Pulls",
    type: "pull",
    location: "both",
  },
  hammer_curl: {
    id: "hammer_curl",
    name: "Hammer Curls",
    type: "pull",
    location: "both",
  },
  bicep_21s: {
    id: "bicep_21s",
    name: "Bicep 21s",
    type: "pull",
    location: "both",
  },

  // LEGS
  leg_press: {
    id: "leg_press",
    name: "Leg Press Machine",
    type: "legs",
    location: "gym",
  },
  romanian_deadlift: {
    id: "romanian_deadlift",
    name: "Romanian Deadlift",
    type: "legs",
    location: "both",
  },
  walking_lunges: {
    id: "walking_lunges",
    name: "Walking Lunges",
    type: "legs",
    location: "both",
  },
  leg_curl: {
    id: "leg_curl",
    name: "Leg Curl Machine",
    type: "legs",
    location: "gym",
  },
  calf_raises: {
    id: "calf_raises",
    name: "Calf Raises",
    type: "legs",
    location: "both",
  },

  // GLUTES
  glute_bridge: {
    id: "glute_bridge",
    name: "Glute Bridge / Hip Thrust",
    type: "glutes",
    location: "both",
  },
  cable_kickback: {
    id: "cable_kickback",
    name: "Cable / DB Kickbacks",
    type: "glutes",
    location: "gym",
  },
  abductor_machine: {
    id: "abductor_machine",
    name: "Abductor Machine",
    type: "glutes",
    location: "gym",
  },

  // CORE
  weighted_dead_bug: {
    id: "weighted_dead_bug",
    name: "Weighted Dead Bug",
    type: "core",
    location: "both",
  },
  plank_taps: {
    id: "plank_taps",
    name: "Plank Shoulder Taps",
    type: "core",
    location: "both",
  },
  russian_twist: {
    id: "russian_twist",
    name: "Kettlebell Russian Twists",
    type: "core",
    location: "both",
  },
  woodchop: {
    id: "woodchop",
    name: "Standing KB Woodchop",
    type: "core",
    location: "both",
  },
  glute_march: {
    id: "glute_march",
    name: "Glute Bridge March",
    type: "core",
    location: "both",
  },
  mountain_climbers: {
    id: "mountain_climbers",
    name: "Mountain Climbers",
    type: "core",
    location: "both",
  },

  // UPPER
  shoulder_press: {
    id: "shoulder_press",
    name: "DB/KB Shoulder Press",
    type: "upper",
    location: "both",
  },
  front_lateral_combo: {
    id: "front_lateral_combo",
    name: "Front + Lateral Raise Combo",
    type: "upper",
    location: "both",
  },

  // LOWER
  goblet_squat: {
    id: "goblet_squat",
    name: "Goblet Squat",
    type: "lower",
    location: "both",
  },
  banded_crab_walk: {
    id: "banded_crab_walk",
    name: "Banded Crab Walk",
    type: "lower",
    location: "both",
  },
};
