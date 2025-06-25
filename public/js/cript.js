// public/js/cript.js
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn            = document.querySelector(".toggle-btn");
  const togglePage           = document.querySelector(".toggle-page");
  const toggleContent        = document.querySelector(".toggle-content");
  const simOptions           = document.querySelectorAll(".sim-option");
  const selectedSimInput     = document.getElementById("selectedSim");
  const stopSelectedSimInput = document.getElementById("stopSelectedSim");
  const startForm            = document.getElementById("startForm");
  const stopForm             = document.getElementById("stopForm");

  // 1) Wire up modal open/close – these only need toggleBtn/togglePage/toggleContent
  if (toggleBtn && togglePage && toggleContent) {
    toggleBtn.addEventListener("click", e => {
      e.preventDefault();
      togglePage.style.display = "flex";
    });
    // click outside content closes it
    togglePage.addEventListener("click", () => {
      togglePage.style.display = "none";
    });
    toggleContent.addEventListener("click", e => e.stopPropagation());
  } else {
    console.error("cript.js: toggle button or modal elements missing");
  }

  // 2) Wire up SIM-option selection
  if (simOptions.length) {
    // Restore selection from localStorage if you like,
    // or default to the first .sim-option
    let selectedSim = localStorage.getItem("selectedSim") || 
                      simOptions[0].querySelector("input[name=sim]").value;

    // Apply initial UI state
    function applySelection() {
      simOptions.forEach(opt => {
        const radio = opt.querySelector('input[name="sim"]');
        const active = radio.value === selectedSim;
        opt.classList.toggle("active", active);
        radio.checked = active;
      });
    }
    applySelection();

    simOptions.forEach(option => {
      option.addEventListener("click", () => {
        const radio = option.querySelector('input[name="sim"]');
        if (!radio) return;
        selectedSim = radio.value;
        localStorage.setItem("selectedSim", selectedSim);
        applySelection();
        togglePage.style.display = "none";
      });
    });

    // 3) Inject into forms
    if (startForm) {
      startForm.addEventListener("submit", () => {
        if (selectedSimInput) selectedSimInput.value = selectedSim;
      });
    }
    if (stopForm) {
      stopForm.addEventListener("submit", () => {
        if (stopSelectedSimInput) stopSelectedSimInput.value = selectedSim;
      });
    }
  } else {
    console.error("cript.js: no .sim-option elements found");
  }

  // 4) Green-ball “active” state logic (optional)
  const greenBall = document.getElementById("greenBall");
  if (greenBall) {
    let sim1Active = localStorage.getItem("sim1Active") === "true";
    let sim2Active = localStorage.getItem("sim2Active") === "true";

    function updateGreenBall() {
      greenBall.classList.toggle("active", sim1Active || sim2Active);
      greenBall.classList.toggle("red-shadow", sim1Active && sim2Active);
    }
    updateGreenBall();

    if (startForm) {
      startForm.addEventListener("click", () => {
        if (localStorage.getItem("selectedSim") === "SIM 1") {
          sim1Active = true;
          localStorage.setItem("sim1Active", "true");
        } else {
          sim2Active = true;
          localStorage.setItem("sim2Active", "true");
        }
        updateGreenBall();
      });
    }
    if (stopForm) {
      stopForm.addEventListener("click", () => {
        if (localStorage.getItem("selectedSim") === "SIM 1") {
          sim1Active = false;
          localStorage.setItem("sim1Active", "false");
        } else {
          sim2Active = false;
          localStorage.setItem("sim2Active", "false");
        }
        updateGreenBall();
      });
    }
  }
});