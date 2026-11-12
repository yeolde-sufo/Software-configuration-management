// Checklist progress and light/dark theme toggle.

const STORAGE_KEY = "scm-demo-theme";

const checkboxes = Array.from(document.querySelectorAll(".stage-check"));
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const themeToggle = document.getElementById("theme-toggle");

function updateProgress() {
  const total = checkboxes.length;
  const done = checkboxes.filter((box) => box.checked).length;
  const percent = Math.round((done / total) * 100)

  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${done} of ${total} practices ticked (${percent}%)`;
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "Switch to light" : "Switch to dark";
}

function loadSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // Storage can be blocked; fall back to the default theme.
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Ignore: the theme still applies for this page view.
  }
}

checkboxes.forEach((box) => {
  box.addEventListener("change", updateProgress);
});

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  saveTheme(next);
});

applyTheme(loadSavedTheme() === "dark" ? "dark" : "light");
updateProgress();
