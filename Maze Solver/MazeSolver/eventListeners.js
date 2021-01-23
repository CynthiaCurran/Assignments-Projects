//generates a random maze and solves it

//Global variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

//How long and wide the maze is
var length = document.getElementById("mazeLength").value;
var width = document.getElementById("mazeWidth").value;

//Buttons and inputs on the page
var createMazeButton = document.getElementById("createMazeButton");
var solveMazeButton = document.getElementById("solveMazeButton");
var mazeLengthInput = document.getElementById("mazeLength");
var mazeWidthInput = document.getElementById("mazeWidth");

var maze; //Will hold the maze array

const BLOCK_SIZE = 7; //How big each block of the maze is in pixels


// EVENT LISTENER FUNCTIONS

//generates and displays a maze
var createMaze = () => {

  //Create a maze generator, generate the maze, display it
  var mg = new MazeGenerator(length, width);
  maze = mg.generateMaze();
  displayMaze(maze);

  //Once a maze is created, solving it is an option
  solveMazeButton.disabled = false;
}

var solveMaze = () => {

  //Create the maze solver, solve the maze, display it
  var ms = new MazeSolver(maze, length, width);
  maze = ms.solveMaze();
  displayMaze(maze);
}

//function used to display a maze
function displayMaze(maze){

  //clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < length; i++){
    for(var j = 0; j < width; j++){

      //Check the color based on the value and display it
      //whitespace
      if(maze[i][j] == 0){  //display white
        ctx.fillStyle = "#ffffff";
        ctx.fillRect((i*BLOCK_SIZE), (j*BLOCK_SIZE), (BLOCK_SIZE), (BLOCK_SIZE));
      }

      //walls
      else if(maze[i][j] == 1){  //display black
        ctx.fillStyle = "#000000";
        ctx.fillRect((i*BLOCK_SIZE), (j*BLOCK_SIZE), (BLOCK_SIZE), (BLOCK_SIZE));
      }

      //start
      else if(maze[i][j] == 10){  //display black
        ctx.fillStyle = "#3fff05";
        ctx.fillRect((i*BLOCK_SIZE), (j*BLOCK_SIZE), (BLOCK_SIZE), (BLOCK_SIZE));
      }

      //finish
      else if(maze[i][j] == 20){  //display black
        ctx.fillStyle = "#ff0d00";
        ctx.fillRect((i*BLOCK_SIZE), (j*BLOCK_SIZE), (BLOCK_SIZE), (BLOCK_SIZE));
      }

      //traveled paths
      else if(maze[i][j] == 2){  //display black
        ctx.fillStyle = "#fff94f";
        ctx.fillRect((i*BLOCK_SIZE), (j*BLOCK_SIZE), (BLOCK_SIZE), (BLOCK_SIZE));
      }

      //correct path
      else if(maze[i][j] == 3){  //display black
        ctx.fillStyle = "#80ffff";
        ctx.fillRect((i*BLOCK_SIZE), (j*BLOCK_SIZE), (BLOCK_SIZE), (BLOCK_SIZE));
      }
    }
  }
}


// EVENT LISTENERS

//Allows button to randomly create a maze
createMazeButton.addEventListener("click", createMaze);

//Allows button to solve the maze, if there is a maze to solve
solveMazeButton.addEventListener("click", solveMaze);

//Updates the maze length
mazeLengthInput.addEventListener("input", function(e){
  length = mazeLengthInput.value;
});

//Updates the maze width
mazeWidthInput.addEventListener("input", function(e){
  width = mazeWidthInput.value;
});
