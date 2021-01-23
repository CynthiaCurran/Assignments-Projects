// PAGE EVENT LISTENERS

var canvas = document.getElementById("canvas");
//Detects when the canvas is clicked and needs to act according to the current mode
canvas.addEventListener("click", function(e) {
  if(mode == "create"){ //If the user is in Create Polygon mode
    var canvasBox = canvas.getBoundingClientRect();
    var mouseX = Math.round(e.clientX - canvasBox.left);  //Get the mouse coordinates on the canvas (in relation to the page)
    var mouseY = Math.round(e.clientY - canvasBox.top);

    vertices.push([mouseX, mouseY]);  //Add the vertice to the list of vertices
  }

  if(mode == "delete"){ //If the user is in Delete mode

    //Make a Point based on the user's mouse coordinates
    var canvasBox = canvas.getBoundingClientRect();
    var mousePoint = [Math.round(e.clientX - canvasBox.left), Math.round(e.clientY - canvasBox.top)]
    var deleteIndex = -1;   //If a polygon is found, this is where its index is stored

    for(var i = polygons.length - 1; i > -1; i--){ //Go through each polygon in reverse (to get the top polygon)

      //Recreate the polygon without the color and line width aspects
      //geometric uses polygons without the color and line width attributes
      polygon = [];
      for(var j = 2; j < polygons[i].length; j++){
        polygon.push(polygons[i][j]);
      }

      //If the mouse is on the polygon, and another has not been found, delete the polygon
      if(deleteIndex == -1){
        if(geometric.pointInPolygon(mousePoint, polygon)){
          deleteIndex = i;
        }
      }
    }

    if(deleteIndex != -1){
      polygons.splice(deleteIndex, 1);
    }
  }

});

//Used to tell when a polygon has been selected for rotation, transformation, and scaling
canvas.addEventListener("mousedown", function(e){

  if(mode == "translate" || mode == "scale" || mode == "rotate"){
    var selectIndex = -1; //Used to tell if a polygon has been selected
    var canvasBox = canvas.getBoundingClientRect(); //Used for finding mouse coordinates
    var mousePoint = [Math.round(e.clientX - canvasBox.left), Math.round(e.clientY - canvasBox.top)]  //The mouse coordinates

    for(var i = polygons.length - 1; i > -1; i--){ //Go through each polygon in reverse (to get the top polygon)

      //Recreate the polygon without the color and line width aspects
      //geometric uses polygons without the color and line width attributes
      polygon = [];
      for(var j = 2; j < polygons[i].length; j++){
        polygon.push(polygons[i][j]);
      }

    //If the mouse is on the polygon, and another has not been found, delete the polygon
      if(selectIndex == -1){
        if(geometric.pointInPolygon(mousePoint, polygon)){
          selectIndex = i;
        }
      }
    }

    if(selectIndex != -1){
      selectedPolygon = polygons[selectIndex];
      polygons.splice(selectIndex, 1);
      polygonSelected = true;
    }
  }
});

//When the mouse has been released, stop the selection, if there is one
canvas.addEventListener("mouseup", function(e){

  if(polygonSelected){
    polygons.push(selectedPolygon); //Put the polygon back
    polygonSelected = false;
    //Deleting the selectedPolygon variable is not required since it would be overwritten on the next selection
  }
});

//When the mouse has been moved and it has selected a polygon for transformation
canvas.addEventListener("mousemove", function(e){
  //If a polygon is selected
  if(polygonSelected){

    //Get the mouse coordinates
    var canvasBox = canvas.getBoundingClientRect();
    var mouseX = Math.round(e.clientX - canvasBox.left);  //Get the mouse coordinates on the canvas (in relation to the page)
    var mouseY = Math.round(e.clientY - canvasBox.top);
    var mousePoint = [mouseX, mouseY];

    //Get the polygon without the color and line width attributes
    polygon = [];
    polygonAttrs = [selectedPolygon[0], selectedPolygon[1]];  //Set the attributes aside
    for(var i = 2; i < selectedPolygon.length; i++){
      polygon.push(selectedPolygon[i]);
    }

    //if the user is in translate mode
    if(mode == "translate"){

      //Set the center of the object to equal the mouse coordinates
      var newPolygon = geometric.polygonTranslate(polygon, getAngleInDegrees(mousePoint, geometric.polygonCentroid(polygon)), getDistance(mousePoint, geometric.polygonCentroid(polygon)));
      newPolygon.forEach(function(item, index, array) { //Create a polygon with the old attributes and new vertices
        polygonAttrs.push(item);
      });

      selectedPolygon = polygonAttrs; //Assign the new polygon to the selected variable
    }

    //if the user is in scale mode
    if(mode == "scale"){

      //Scale the polygon based on the mouse's distance from the centroid
      var newPolygon = geometric.polygonScale(polygon, getDistance(mousePoint, geometric.polygonCentroid(polygon)) / getDistance(polygon[0], geometric.polygonCentroid(polygon)));
      newPolygon.forEach(function(item, index, array) { //Create a polygon with the old attributes and new vertices
        polygonAttrs.push(item);
      });

      selectedPolygon = polygonAttrs; //Assign the new polygon to the selected variable
    }

    if(mode == "rotate"){
      var angle1 = getAngleInDegrees(geometric.polygonCentroid(polygon), polygon[0]); //Get the angle between the centroid and first vertice
      var angle2 = getAngleInDegrees(mousePoint, geometric.polygonCentroid(polygon)); //Get the angle between the centroid and the mouse
      var newAngle = angle2 - angle1;   //Subtract the 2 angles. This is how much the polygon will rotate

      var newPolygon = geometric.polygonRotate(polygon, newAngle, geometric.polygonCentroid(polygon));
      newPolygon.forEach(function(item, index, array) { //Create a polygon with the old attributes and new vertices
        polygonAttrs.push(item);
      });

      selectedPolygon = polygonAttrs; //Assign the new polygon to the selected variable
    }
  }
});

//When a button is pressed, the mode changes
//These are the event listeners to change modes

//Tells the canvas to allow vertice creation
var createButton = document.getElementById("createButton");
createButton.addEventListener("click", function(e){
  modeText.textContent = "Current Mode: Create Polygon";
  mode = "create";
});

//Used to create a new polygon when all the vertices are added
var finishButton = document.getElementById("finishButton");
finishButton.addEventListener("click", function(e){

  var newPolygon = [];  //Create an empty polygon object
  newPolygon.push(lineWidth); //Add its line width to it
  newPolygon.push(color); //Add its color to it

  //Go through each vertice and add them to the polygon
  vertices.forEach(function(item, index, array) {
    newPolygon.push(item);
  });

  polygons.push(newPolygon);  //Add the new polygon to the array

  vertices = [];  //Empty the vertices array

  finishButton.disabled = true; //Disable the button since the vertices were just removed
});

var transformButton = document.getElementById("translateButton");
transformButton.addEventListener("click", function(e){
  modeText.textContent = "Current Mode: Translate";
  mode = "translate";
});

var rotateButton = document.getElementById("rotateButton");
rotateButton.addEventListener("click", function(e){
  modeText.textContent = "Current Mode: Rotate";
  mode = "rotate";
});

var scaleButton = document.getElementById("scaleButton");
scaleButton.addEventListener("click", function(e){
  modeText.textContent = "Current Mode: Scale";
  mode = "scale";
});

//Used to tell the canvas to delete selected polygons
var deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", function(e){
  modeText.textContent = "Current Mode: Delete";
  mode = "delete";
});

//Clears the canvas of everything
var clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", function(e){
  vertices = [];
  polygons = [];
});

//Add a color wheel to allow the user to select the polygon fill
var colorWheel = new ReinventedColorWheel({
  //Add the wheel to the page
  appendTo: document.getElementById("wheelContainer"),

  //Set the RGB value to a default red
  rgb: [255, 0, 0],

  //set the appearance
  wheelDiameter: 200,
  wheelThickness: 20,
  handleDiameter: 16,
  wheelReflectsSaturation: true,

  //this is what it does when the color changes
  onChange: function (wheel) {
    color = wheel.hex;
  },
});

//Allows for the user to change the line width
var lineWidthInput = document.getElementById("lineWidth");
lineWidthInput.addEventListener("input", function(e){
  lineWidth = lineWidthInput.value;
});
