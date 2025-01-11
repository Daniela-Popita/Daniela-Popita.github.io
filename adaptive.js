// Select DOM elements
const toggleButton = document.getElementById("toggle-theme");
const body = document.body;

// Function to set theme based on preference
function setTheme() {
  const userPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark" || (!currentTheme && userPrefersDark)) {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
}

// Toggle theme manually
toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  const theme = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});

// Apply the theme on page load
setTheme();
