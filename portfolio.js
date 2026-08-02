// App State
const appState = {
  theme: localStorage.getItem("theme") || "dark"
};

// Initialization Trigger
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initButtons();
});

// Theme Logic
function initTheme() {
  const themeBtn = document.getElementById("theme-toggle");
  if (!themeBtn) return;

  // Set initial state from localStorage
  document.documentElement.setAttribute("data-theme", appState.theme);
  themeBtn.textContent = appState.theme === "dark" ? "☀️" : "🌙";

  themeBtn.addEventListener("click", () => {
    appState.theme = appState.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", appState.theme);
    localStorage.setItem("theme", appState.theme);
    themeBtn.textContent = appState.theme === "dark" ? "☀️" : "🌙";
  });
}

// Button Interaction Handler
function initButtons() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}