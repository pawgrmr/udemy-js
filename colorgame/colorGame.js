// var colors = [
// 	"rgb(255, 0, 0)",
// 	"rgb(255, 255, 0)",
// 	"rgb(0, 255, 0)",
// 	"rgb(0, 255, 255)",
// 	"rgb(0, 0, 255)",
// 	"rgb(255, 0, 255)"
// ];
var numSquares = 6;
// var colors = generateRandomColors(numSquares);// generate 6 random colors refactored
var colors = [];
// var pickedColor = pickColor(); refactored
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1")
var resetButton = document.querySelector("#reset");
// var easyBtn = document.querySelector("#easyBtn"); refactored
// var hardBtn = document.querySelector("#hardBtn"); refactored
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	modeButton();
	squareListener();
	reset();	
}

function modeButton(){
		for (var i = 0; i < modeButtons.length; i++){
			modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");//to remove highlighed button from easy
			modeButtons[1].classList.remove("selected");//to remove highlighted button from hard
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6; //refactored the if statement below into ternary operator
			// if(this.textContent === "Easy"){
			// 	numSquares = 3;
			// } else {
			// 	numSquares = 6;
			// }
			reset();
		});
	}
}

function squareListener(){
	//EVENT LISTENER for squares
	for(var i = 0; i < squares.length; i++){
		// add initial colors to squares
			squares[i].style.backgroundColor = colors[i];

			//add click listeners to squares
			squares[i].addEventListener("click", function() {
				//grab color of clicked squares
				var clickedColor = this.style.backgroundColor;
				//compare color to pickedColor
				if(clickedColor === pickedColor) { //if user wins
					messageDisplay.textContent = "Correct!";
					resetButton.textContent = "Play Again?"
					changeColors(clickedColor);
					h1.style.backgroundColor = clickedColor;
				} else {
					this.style.backgroundColor = "#232323";
					messageDisplay.textContent = "Try Again";
				}
			});
		}
	}



function reset(){
	colors = generateRandomColors(numSquares); // generate the correct number of squares
	//pick new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//change the play again back to new colors
	resetButton.textContent = "New Colors" //this refers to resetButton eventlistener - need to hard code this as now not write it as this.
	messageDisplay.textContent = ""; // makes correct disappear 
	//change colors of squares on page
	for(var i = 0; i < squares.length; i++){
		if (colors[i]){
			squares[i].style.display = "block";// show all 6 colors to start with. Otherwise reset - only shows 3 colors in easy mode.
			squares[i].style.backgroundColor = colors[i];// if there is a color to display in the squares then equal it to colors array
		} else {
			squares[i].style.display = "none";
		}
	}
	//change color of stripe in background back to original
	h1.style.backgroundColor = "#white";
	
}
// easyBtn.addEventListener("click", function(){
// 	//select easy button, turn off hard button
// 	easyBtn.classList.add("selected");
// 	hardBtn.classList.remove("selected");
// 	//change to 3 colors
// 	numSquares = 3;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	//change the written color to be same as pickedcolor
// 	colorDisplay.textContent = pickedColor;
// 	//change colors in the first 3 squares. Take advantage of the colors array which in this case has only 3 colors.
// 	for(var i = 0; i < squares.length; i++) {// this will loop through all squares and change the color if there is a next color.
// 		if(colors[i]){ //this will happen on the first 3
// 			squares[i].style.backgroundColor = colors[i];
// 		} else {
// 			squares[i].style.display = "none"; //becaus console still shows 3 in array even though display doesnt.
// 		}
// 	}
// });

// hardBtn.addEventListener("click", function(){
// 	//select hard button, turn off easy button
// 	hardBtn.classList.add("selected");
// 	easyBtn.classList.remove("selected");
// 	//change to 6 colors
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares); 
// 	pickedColor = pickColor();
// 	//change the written color to be same as pickedcolor
// 	colorDisplay.textContent = pickedColor;
// 	//change colors in the first 3 squares. Take advantage of the colors array which in this case has only 3 colors.
// 	for(var i = 0; i < squares.length; i++) {// this will loop through all squares and change the color if there is a next color.
		
// 			squares[i].style.backgroundColor = colors[i];
// 			squares[i].style.display = "block";
// 	}
// });

resetButton.addEventListener("click", function(){
	reset(); //refactored all the code below into the reset function written above which is the same as the code below.
	// //generate all new colors
	// colors = generateRandomColors(numSquares); // generate the correct number of squares
	// //pick new random color from array
	// pickedColor = pickColor();
	// //change colorDisplay to match picked color
	// colorDisplay.textContent = pickedColor;
	// //change the play again back to new colors
	// this.textContent = "New Colors" //this refers to resetButton eventlistener. can also write it as resetButton.textcontent
	// //change colors of squares on page
	// for(var i = 0; i < squares.length; i++){
	// // add initial colors to squares
	// squares[i].style.backgroundColor = colors[i];
	// }
	// //change color of stripe in background back to original
	// h1.style.backgroundColor = "#white";
	// messageDisplay.textContent = " "; // makes correct disappear 
})

// colorDisplay.textContent = pickedColor; line now redundant as tackling this inside init function



function changeColors(color){ 
//loop through all squares
	for(i = 0; i < squares.length; i++){
// change each color to match given color
	squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	// pick a random color
	//math.random will pick a number between 0 & 1(not including 1) and multiply it by length of array.
	//math.floor takes off the decimal to give you a whole no.
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//add num random colors to arr => use loop
	//repeat num times
	for (var i = 0; i < num; i++){
		arr.push(randomColor())
		// get random color and push into arr
	}
	//return that array
	return arr;
}

function randomColor(){
//pick a "red" from 0-255
var r = Math.floor(Math.random() * 256);//because math.random doesnt include 1 and we want 255)
//pick a "blue" from 0-255
var g = Math.floor(Math.random() * 256);
//pick a "green" from 0-255
var b = Math.floor(Math.random() * 256);
return "rgb(" + r + ", " + g + ", " + b +")"; //string. spaces after the commas
}