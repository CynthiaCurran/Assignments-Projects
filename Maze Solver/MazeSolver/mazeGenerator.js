//Randomly generates a maze array when given a length and width

class MazeGenerator{

  constructor(length, width){
    this.length = length;
    this.width = width;
  }

  //Adds a start and finish to the maze
  addStartFinish(maze){
    var fsmaze = maze;
    var startPoints = new PointList(this.length);
    var finishPoints = new PointList(this.length);
    var start;
    var finish;

    for(var i = 0; i < this.length; i++){
      if(maze[i][this.width-2] == 0){
        startPoints.add(new Point(i, this.width-2));
      }
      if(maze[i][1] == 0){
        finishPoints.add(new Point(i, 1));
      }
    }

    start = startPoints.getRandomPoint();
    finish = finishPoints.getRandomPoint();

    fsmaze[start.x][start.y] = 10;
    fsmaze[finish.x][finish.y] = 20;

    return fsmaze;
  }

  //Randomly adds walls to the maze
  addRandomWalls(maze){
    var completedMaze = maze; //By the end of this process, the maze will be completed
    var wallList = new PointList((this.length*this.width));   //Create a list to store all walls that can accept extensions

    //Add all possible outer walls that can accept extensions, corners excluded
    //Unshift adds to the beginning of the array
    for(var i = 2; i < this.length - 2; i++){
      wallList.add(new Point(i, 0));         //Top wall
      wallList.add(new Point(i, (this.width-1))); //Bottom wall
    }
    for(var i = 2; i < this.width - 2; i++){
      wallList.add(new Point(0, i));         //Left wall
      wallList.add(new Point((this.length - 1), i));  //Right wall
    }

    //while there are points/walls to work with
    while(!wallList.isEmpty()){
      var wall = wallList.getRandomPoint();  //Get a random point

      //Testing to see what to do with the point
      //If the point is an outer wall
      if(wall.x == 0 || wall.x == (this.length - 1) || wall.y == 0 || wall.y == (this.width - 1)){
        //If the outer wall is on the top, check below it, add a point if possible, and delete it
        if(wall.y == 0){
          if((completedMaze[wall.x-1][wall.y+1] + completedMaze[wall.x][wall.y+1] + completedMaze[wall.x+1][wall.y+1] + completedMaze[wall.x-1][wall.y+2] + completedMaze[wall.x][wall.y+2] + completedMaze[wall.x+1][wall.y+2]) == 0){
            wallList.add(new Point(wall.x, wall.y+1));  //Add the new extension to the list
            completedMaze[wall.x][wall.y+1] = 1;  //Add the wall to the maze
          }
        }

        //if the outer wall is on the bottom
        if(wall.y == (this.width - 1)){
          if((completedMaze[wall.x-1][wall.y-1] + completedMaze[wall.x][wall.y-1] + completedMaze[wall.x+1][wall.y-1] + completedMaze[wall.x-1][wall.y-2] + completedMaze[wall.x][wall.y-2] + completedMaze[wall.x+1][wall.y-2]) == 0){
            wallList.add(new Point(wall.x, wall.y-1));  //Add to the wall list
            completedMaze[wall.x][wall.y-1] = 1;    //Add wall to the maze
          }
        }

        //if the outer wall is on the left
        if(wall.x == 0){
          if((completedMaze[wall.x+1][wall.y-1] + completedMaze[wall.x+1][wall.y] + completedMaze[wall.x+1][wall.y+1] + completedMaze[wall.x+2][wall.y-1] + completedMaze[wall.x+2][wall.y] + completedMaze[wall.x+2][wall.y+1]) == 0){
            wallList.add(new Point(wall.x+1, wall.y));  //Add to the wall list
            completedMaze[wall.x+1][wall.y] = 1;    //Add wall to the maze
          }
        }

        //if the outer wall is on the right
        if(wall.x == (this.length - 1)){
          if((completedMaze[wall.x-1][wall.y-1] + completedMaze[wall.x-1][wall.y] + completedMaze[wall.x-1][wall.y+1] + completedMaze[wall.x-2][wall.y-1] + completedMaze[wall.x-2][wall.y] + completedMaze[wall.x-2][wall.y+1]) == 0){
            wallList.add(new Point(wall.x-1, wall.y));  //Add to the wall list
            completedMaze[wall.x-1][wall.y] = 1;    //Add wall to the maze
          }
        }
        wallList.delete(wall);  //If an outer wall is extended or was not able to, it will never add one again. So it is removed from the list
      }

      //If the wall is an inner wall, it needs different logic
      else{
        var whitespaceList = new PointList(4);  //Contains the possible whitespace to randomly turn into a wall

        //check the top side of the wall
        if(completedMaze[wall.x][wall.y-1] == 1){}
        else if((completedMaze[wall.x-1][wall.y-1] + completedMaze[wall.x][wall.y-1] + completedMaze[wall.x+1][wall.y-1] + completedMaze[wall.x-1][wall.y-2] + completedMaze[wall.x][wall.y-2] + completedMaze[wall.x+1][wall.y-2]) == 0){
          whitespaceList.add(new Point(wall.x, wall.y-1));
        }

        //check the bottom of the wall
        if(completedMaze[wall.x][wall.y+1] == 1){}
        else if((completedMaze[wall.x-1][wall.y+1] + completedMaze[wall.x][wall.y+1] + completedMaze[wall.x+1][wall.y+1] + completedMaze[wall.x-1][wall.y+2] + completedMaze[wall.x][wall.y+2] + completedMaze[wall.x+1][wall.y+2]) == 0){
          whitespaceList.add(new Point(wall.x, wall.y+1));
        }

        //check the right side of the wall
        if(completedMaze[wall.x+1][wall.y] == 1){}
        else if((completedMaze[wall.x+1][wall.y-1] + completedMaze[wall.x+1][wall.y] + completedMaze[wall.x+1][wall.y+1] + completedMaze[wall.x+2][wall.y-1] + completedMaze[wall.x+2][wall.y] + completedMaze[wall.x+2][wall.y+1]) == 0){
          whitespaceList.add(new Point(wall.x+1, wall.y));  //Add to the wall list
        }

        //check the left side of the wall
        if(completedMaze[wall.x-1][wall.y] == 1){}
        else if((completedMaze[wall.x-1][wall.y-1] + completedMaze[wall.x-1][wall.y] + completedMaze[wall.x-1][wall.y+1] + completedMaze[wall.x-2][wall.y-1] + completedMaze[wall.x-2][wall.y] + completedMaze[wall.x-2][wall.y+1]) == 0){
          whitespaceList.add(new Point(wall.x-1, wall.y));
        }

        //With all the whitespaces checked, check if there are no options. If so, delete the wall point. Otherwise, randomly pick an available whitespace, create a wall, and add it
        if(whitespaceList.isEmpty()){
          wallList.delete(wall);
        }
        else{
          var newWall = whitespaceList.getRandomPoint();
          wallList.add(newWall);
          completedMaze[newWall.x][newWall.y] = 1;
        }

      }

    }

    return completedMaze;
  }

  //main function for generating and returning a maze array
  generateMaze(){

    //Start maze
    var maze = new Array(this.length);
    for(var i = 0; i < this.length; i++){
      maze[i] = new Array(this.width);
    }

  /*
  1: Wall
  0: Whitespace
  10: Start
  20: Finish
  2: Traveled Path (for the solver to add)
  3: Correct path
  */

    //Start by filling it with 0's
    for(var i = 0; i < this.length; i++){
      for(var j = 0; j < this.width; j++){
        maze[i][j] = 0;
      }
    }

    //Add the top and bottom outer walls
    for(var i = 0; i < this.length; i++){
      maze[i][0] = 1;     //Add top walls
      maze[i][this.width - 1] = 1; //Add bottom walls
    }

    //Add left and right outer walls
    for(var i = 0; i < this.width; i++){
      maze[0][i] = 1;       //Left walls
      maze[this.length - 1][i] = 1;  //Right walls
    }

    //randomly add the walls
    maze = this.addRandomWalls(maze);
    maze = this.addStartFinish(maze);

    return maze;
  }

}
