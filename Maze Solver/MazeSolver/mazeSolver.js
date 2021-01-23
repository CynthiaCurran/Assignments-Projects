//Solves a given maze

class MazeSolver{

  constructor(maze, length, width){
    this.maze = maze;
    this.length = length;
    this.width = width;
  }

  //Solves the maze
  solveMaze(){

    var start;  //Where the maze starts
    var smartPoints = new PointList(this.length * this.width);  //Stores every smart point being used for solving
    var newSmartPoints = new PointList(this.length * this.width); //Every iteration, the solver looks at new SmartPoints
    var finishFound = false;

    //get and find the start
    for(var i = 0; i < this.length; i++){
      if(this.maze[i][this.width-2] == 10){
        start = new SmartPoint(i, this.width-2, new PointList(this.length * this.width)); //Make the start a SmartPoint so it can remember how to get back to the start
      }
    }

    //Add the start to the list
    smartPoints.add(start);


    //Seek the finish
    while(!finishFound){

      //Go through each point and find all new possible points
      smartPoints.list.forEach(point => {

        //Look at each point next to the original point. If it's the finish, say so. Otherwise, start adding new points
        if(this.maze[point.x][point.y-1] == 20 || this.maze[point.x][point.y+1] == 20 || this.maze[point.x-1][point.y] == 20 || this.maze[point.x+1][point.y] == 20){
          this.maze[point.x][point.y] = 3;  //Update the current coord to show it is part of the correct path
          point.finishFound = true; //Mark this point as the one that found the finish
          finishFound = true;       //Mark the solver as having found the finish
        }
        else{ //If the finish is not found, look at the surrounding points and add them to the new point list if they are blank

          if(this.maze[point.x-1][point.y] == 0){
            var newPoint = new SmartPoint(point.x-1, point.y, point.memory.getCopy());  //Create the new point
            newPoint.memory.add(point); //Remember the point that came before this new point
            newSmartPoints.add(newPoint); //Add the new point to the new list
            this.maze[point.x-1][point.y] = 2;  //Update the maze coordinate
          }

          if(this.maze[point.x+1][point.y] == 0){
            var newPoint = new SmartPoint(point.x+1, point.y, point.memory.getCopy());  //Create the new point
            newPoint.memory.add(point); //Remember the point that came before this new point
            newSmartPoints.add(newPoint); //Add the new point to the new list
            this.maze[point.x+1][point.y] = 2;  //Update the maze coordinate
          }

          if(this.maze[point.x][point.y-1] == 0){
            var newPoint = new SmartPoint(point.x, point.y-1, point.memory.getCopy());  //Create the new point
            newPoint.memory.add(point); //Remember the point that came before this new point
            newSmartPoints.add(newPoint); //Add the new point to the new list
            this.maze[point.x][point.y-1] = 2;  //Update the maze coordinate
          }

          if(this.maze[point.x][point.y+1] == 0){
            var newPoint = new SmartPoint(point.x, point.y+1, point.memory.getCopy());  //Create the new point
            newPoint.memory.add(point); //Remember the point that came before this new point
            newSmartPoints.add(newPoint); //Add the new point to the new list
            this.maze[point.x][point.y+1] = 2;  //Update the maze coordinate
          }
        }
      });

      //After the new points have been added, update the points lists, if the finish was not found
      if(!finishFound){
        smartPoints = newSmartPoints; //We do not need the old points, so we can get rid of them and focus on the new ones
        newSmartPoints = new PointList(this.length * this.width); //Recreate the new point list for the next iteration
      }
    }

    //Once the finish has been found, find the SmartPoint that found it
    var finishPoint = new SmartPoint(0, 0, new PointList(this.length * this.width));  //Create a blank point

    //loop through the smartpoints and find the finisher
    smartPoints.list.forEach(point => {
      if(point.finishFound){
        finishPoint = point;
      }
    });

    //Once the finish point has been found, loop through its memory and show the correct path
    finishPoint.memory.list.forEach(point => {
      this.maze[point.x][point.y] = 3;
    });

    //Return the solved maze
    return this.maze;

  }
}
