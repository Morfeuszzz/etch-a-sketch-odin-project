const grid = document.getElementById("grid");
const defaultSquaresPerSide = 16;
const sizeSlider = document.getElementById("sizeSlider");

let squaresPerSide = defaultSquaresPerSide;
let colorBtn = document.getElementById("colorBtn");
let rainbowBtn = document.getElementById("rainbowBtn");
let eraserBtn = document.getElementById("eraserBtn");
let clearBtn = document.getElementById("clearBtn");
let cells = document.querySelectorAll(".grid-item");
let currentMode = "color";

// function that marks on the page what mode is currently active
function activateButton(newMode) {
    if (currentMode === "rainbow") {
        rainbowBtn.classList.remove("active");
    } else if (currentMode === "color") {
        colorBtn.classList.remove("active");
    } else if (currentMode === "eraser") {
        eraserBtn.classList.remove("active");
    }

    if (newMode === "rainbow") {
        rainbowBtn.classList.add("active");
    } else if (newMode === "color") {
        colorBtn.classList.add("active");
    } else if (newMode === "eraser") {
        eraserBtn.classList.add("active");
    }
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// function that marks the active mode
function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

sizeSlider.onmousemove = (e) => {
    showSize(e.target.value);
}

sizeSlider.onchange = (e) => {
    changeGridSize(e.target.value);
}

//clear grid and create new one
function clearGrid() {
    grid.innerHTML = "";
    createSquare(defaultSquaresPerSide);
}

// show size of grid
function showSize(value) {
    document.getElementById("showSize").innerHTML = `${value} x ${value}`;
}

// function that changes the grid size, first clear grid than create new one
function changeGridSize(squaresPerSide) {
    clearGrid();
    createSquare(squaresPerSide);
}

// add functions to buttons
colorBtn.onclick = () => setCurrentMode("color");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = () => clearGrid();

// function that creates grid
function createSquare(squaresPerSide) {
    grid.style.gridTemplateRows = `repeat(${squaresPerSide}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${squaresPerSide}, 1fr)`;

    for(let i = 0; i < (squaresPerSide*squaresPerSide); i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-item");
        cell.addEventListener("mouseover", changeColor);
        cell.addEventListener("mousedown", changeColor);
        grid.appendChild(cell);
    }
}

// function that changes colors depending on the mode
function changeColor(e) {
    if (e.type === "mouseover" && !mouseDown) return
    if (currentMode === "rainbow") {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === "color") {
        e.target.style.backgroundColor = "black";
    } else if (currentMode === "eraser") {
        e.target.style.backgroundColor = "white";
    }
}

// what is to happen when after the page is loaded
window.onload = () => {
    createSquare(defaultSquaresPerSide);
    activateButton(currentMode);
} 