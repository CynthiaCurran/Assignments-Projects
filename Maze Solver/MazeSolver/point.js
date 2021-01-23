//Point and PointList classes

//Holds a single array coordinate of the maze
class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

//An ArrayList for points, because JS has no lists
class PointList{

  constructor(size){
    this.size = size;             //The size
    this.list = new Array(size);  //Holds the elements
    this.numElems = 0;            //Used for indexing
  }

  //Add an element
  add(elem){
    this.list[this.numElems++] = elem; //Add to the current index and increment it
  }

  //If the list is empty, return true. Otherwise, false
  isEmpty(){
    return (this.numElems == 0);
  }

  //Delete a point from the list and adjust the array accordingly
  delete(elem){
    for(var i = 0; i < this.numElems; i++){ //Go through the whole list
      if(this.list[i].x == elem.x && this.list[i].y == elem.y){ //If elem is found in the list
        for(var j = i; j < this.numElems - 1; j++){   //Move the list down, deleting the Point
          this.list[j] = this.list[j+1];
        }
        this.numElems--;
      }
    }
  }

  getRandomPoint(){
    return this.list[Math.floor(Math.random() * Math.floor(this.numElems))]; //Ex. if numElems = 21, chooses a random point from index 0 to 20
  }

  getCopy(){
    var copy = new PointList(this.size);
    for(var i = 0; i < this.numElems; i++){
      copy.add(this.list[i]);
    }
    return copy;
  }
}


//Used for solving the maze. Each point remembers the points that came before it in a PointList
class SmartPoint{
  constructor(x, y, memory){
    this.x = x;
    this.y = y;
    this.memory = memory; //Stores every point that came before this point
    this.finishFound = false;
  }
}
