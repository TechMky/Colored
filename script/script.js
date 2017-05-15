var numSquares = 6;
var colors = [];
var pickedColor;

var colorDisplay = document.getElementById("colorDisplay");
var squares = document.querySelectorAll(".square");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    // modeButtons toggles
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }

    for (var i = 0; i < squares.length; i++) {

        // add event listeners
        squares[i].addEventListener("click", function () {
            var clickedColor = this.style.background;

            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?"
                changeColors(clickedColor);
            }
            else {
                this.style.background = "#232323";
                messageDisplay.textContent = "Try Again!";
            }
        });
    }

    reset();
}

function reset() {
    //generate all new colors
    colors = generateColors(numSquares);
    //pick new correct color from array
    pickedColor = pickColor();
    //change color display
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors!";
    // change the colors of all squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
    //resetting h1 color too after resetting
    h1.style.background = "steelblue";
}

//reset button..
resetButton.addEventListener("click", function () {
    reset();
    //resetting h1 color too after resetting
    h1.style.background = "steelblue";
});

//change colors of the squares
function changeColors(color) {
    //loop through all squares
    //change the color
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
    h1.style.background = color;
}

//pick random color from generated colors
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

//generate rancom colors
function generateColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

//random R G B channels
function randomColor() {
    //pick 0 - 255 for all 3 channels, RGB
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}