function saveAppData() {
  localStorage.setItem("appData", JSON.stringify(appData));
}
function loadAppData() {
  const stored = localStorage.getItem("appData");
  if (stored) appData = JSON.parse(stored);
  return appData;
}
function updateAppData(callback) {
  loadAppData();
  callback(appData);
  saveAppData();
}
function todayKey() {
  return new Date().toISOString().split("T")[0];
}
