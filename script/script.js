// KEEPING GLOBAL VARS FOR SIMPLICITY

var numSquares = 6;
var colors = [];
var pickedColor;
var noOfClicks = 0;
var totalScore = 0;

var colorDisplay = document.getElementById("colorDisplay");
var squares = document.querySelectorAll(".square");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var h2 = document.querySelector("h2");
var secondMessage = document.getElementById('secondary_message');
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");
var points = document.getElementById("points");

init();

function init() {
    // modeButtons toggles
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent === "Easy"){
                numSquares = 3;
            }else{
                numSquares = 6
            }
            reset();
        });
    }

    attachSquareHandler();
    reset();
}

function attachSquareHandler(){
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", handleOnSquareClick);
    }

}

function removeSquareHandler(){
    for (var i = 0; i < squares.length; i++) {
        squares[i].removeEventListener("click", handleOnSquareClick);
    }

}

function handleOnSquareClick(){
    var clickedColor = this.style.background;
    var currentMode = document.querySelector('.selected').textContent;
    if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        points.textContent = getScore(currentMode);
        if(checkEndGame(noOfClicks,currentMode)){
            endGame(pickedColor)
        }else{
            noOfClicks = 0;
            messageDisplay.textContent = "Getting New Colors!";
            setTimeout(resetSquares, 800)
        }
        changeColors(pickedColor);
    }
    else {
        noOfClicks++;
        this.style.background = "#232323"; // set the color to the body color so it seems as it fades away
        messageDisplay.textContent = "Try Again!";
    }
   
}

function getScore(mode){

    switch (mode) {
        case "Easy":
            totalScore += (10 - noOfClicks);
            break;
    
        default:
            totalScore += (10 - (noOfClicks * 2));
            break;
    }

    return totalScore;
}

function checkEndGame(noOfClicks,mode){
    // var squareCount = document.querySelectorAll('.hide').length;
    // console.log("TCL: checkEndGame -> squareCount", squareCount)
    if(noOfClicks === 2 && mode === "Easy") return true;
    if(noOfClicks === 5 && mode === "Hard") return true;
    return false;
}

function endGame(pickColor){
    colorDisplay.textContent = `Your final score is ${points.textContent}`;
    messageDisplay.textContent = "Game Over!";
    h2.style.display = 'none';
    secondMessage.style.background = pickColor;
    secondMessage.style.display = 'block';
    secondMessage.textContent = 'Click on \"NEW GAME\" to play again!';
    removeSquareHandler();
}

function resetSquares(){
    colors = generateColors(numSquares);
    //pick new correct color from array
    pickedColor = pickColor();
    //change color display
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    // change the colors of all squares
    for (var i = 0; i < squares.length; i++) {
        // squares[i].classList.remove('hide');
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
}

function reset() {
    
    resetSquares();
    attachSquareHandler();
    //resetting h1 color too after resetting
    h1.style.background = "steelblue";
    h2.style.background = "steelblue";
    h2.style.display = "block";
    secondMessage.style.display = "none";
    //reset points 
    points.textContent = '0';
    //reset clicks
    noOfClicks = 0;

    totalScore = 0;
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
    h2.style.background = color;
}

//pick random color from generated colors
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

//generate random colors
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