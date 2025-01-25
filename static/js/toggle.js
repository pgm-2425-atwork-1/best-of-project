const $toggleButton = document.querySelector(".header__theme-toggle");
const root = document.documentElement;

function loadTheme() {
  console.log("1", localStorage.getItem("theme"));
  const savedTheme = localStorage.getItem("theme");
  console.log("2", localStorage.getItem("theme"));
  if (savedTheme) {
    root.classList.add(savedTheme);
    updateIcon(savedTheme);
  }
}

function updateIcon(theme) {
  if (theme === "light-mode") {
    $toggleButton.innerHTML =
      '<img class="moon" id="moon" src="static/images/icons/moon.svg" alt="moon">';
  } else {
    $toggleButton.innerHTML =
      '<img class="sun" id="sun" src="static/images/icons/sun.svg" alt="sun">';
  }
}

$toggleButton.addEventListener("click", () => {
  if (root.classList.contains("light-mode")) {
    root.classList.remove("light-mode");
    localStorage.setItem("theme", "dark-mode");
    updateIcon("dark-mode");
  } else {
    root.classList.add("light-mode");
    localStorage.setItem("theme", "light-mode");
    updateIcon("light-mode");
  }
  
});


loadTheme();

