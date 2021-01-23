/*
This program allows the user to create custom polygons on the page and manipulate them
Uses HarryStevens' geometric.js   (https://www.npmjs.com/package/geometric)
Uses luncheon's Reinvented Color Wheel (https://www.npmjs.com/package/reinvented-color-wheel)
*/


//VARIABLES

//Used to manipulate the canvas where the polygons are
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//The mode the user has selected
var modeText = document.getElementById("mode");   //Used to display what mode is currently selected
var mode = "create";                           //Default mode when the page opens, used for deciding what the canvas should do

//Hold the current vertices and already-made polygons
var vertices = [];  //Vertices are arrays with an X and Y coordinate
var polygons = [];  //Polygons are arrays of vertices, except for the first element which is the color

//holds the user inputs for color and line width
var color = "#ff0000";  //Red by default
var lineWidth = 5;

//Used for rotate, scale, and transform, shows what polygon is selected for them
var selectedPolygon = [];   //Holds the selected polygon object
var polygonSelected = false;  //Shows whether or not a polygon has been selected



//MAIN FUNCTIONS

//The main loop, ran every frame to update the canvas
function main(){

  //Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //Draw the vertices and polygons onto the canvas
  drawPolygons();
  drawVertices();

  //Update the selected polygon, if there is one selected
  if(polygonSelected){
    drawSelected();
  }

  //Check if the creation of a new polygon is possible
  if(vertices.length > 2){  //There needs to be at least 3 vertices to start a new polygon
    document.getElementById("finishButton").disabled = false; //Re-enable the finish polygon button
  }
  else{
    document.getElementById("finishButton").disabled = true;  //Otherwise, disable it
  }

  //Request the canvas to be redrawn every frame
  requestAnimationFrame(main);
}

//Draws the current vertices onto the canvas
function drawVertices(){
  //Loop through each vertice and draw it
  ctx.fillStyle = "#000000";  //Set the color to black
  vertices.forEach(function(item, index, array) {
    ctx.fillRect(item[0], item[1], 4, 4);
  });
}

//Draws the polygons onto the canvas
function drawPolygons(){
  polygons.forEach(function(item, index, array) { //Go through each polygon
    ctx.lineWidth = item[0];   //Use the line width the user selected
    ctx.beginPath();  //Begin the path
    ctx.moveTo(item[2][0], item[2][1]); //Move the path to the starting point
    for(var i = 3; i < item.length; i++){ //Go to the other vertices and draw the lines between them
      ctx.lineTo(item[i][0], item[i][1]);
      ctx.stroke();
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = item[1];  //Set the fill color of the polygon
    ctx.fill(); //Color the polygon
  });
}

function drawSelected(){

  //Draw the selected polygon
  ctx.lineWidth = selectedPolygon[0];   //Use the line width the user selected
  ctx.beginPath();  //Begin the path
  ctx.moveTo(selectedPolygon[2][0], selectedPolygon[2][1]); //Move the path to the starting point
  for(var i = 3; i < selectedPolygon.length; i++){ //Go to the other vertices and draw the lines between them
    ctx.lineTo(selectedPolygon[i][0], selectedPolygon[i][1]);
    ctx.stroke();
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = selectedPolygon[1];  //Set the fill color of the polygon
  ctx.fill(); //Color the polygon

}

//Used to find the angle between 2 points
//Used for translate, scale, and rotation modes
function getAngleInDegrees(p1, p2){
  return Math.atan2((p1[1] - p2[1]), (p1[0] - p2[0])) * (180/Math.PI);
}

//Gets the distance between 2 points, used for translate, rotate, and scale
function getDistance(p1, p2){
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

//Get the main loop started after getting everything established
main();
