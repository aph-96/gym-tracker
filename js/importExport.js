// Export data
function exportData() {
  const dataStr = JSON.stringify(loadAppData());
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "workoutData.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import data
function importData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      localStorage.setItem("appData", JSON.stringify(imported));
      alert("Data imported!");
      window.location.reload();
    } catch (err) {
      alert("Invalid file");
    }
  };
  reader.readAsText(file);
}
