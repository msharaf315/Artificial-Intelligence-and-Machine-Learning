//intialize variables
// size of our cells,grid,columns and rows
//create a stack to do backtracking when hitting a dead end
var columns, rows;
var size = 20;
var grid = [];
var currentCell;
var stack = [];
function setup() {
  // put setup code here
  // draws the canvas
  createCanvas(400, 400);
  //defne how many rows and columns we have depending on the size of the canvas
  // divided by the size of the cell
  columns = floor(width / size);
  rows = floor(height / size);
  //create cells and put them into the grid
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < columns; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
}

function draw() {
  frameRate(500);
  // put drawing code here
  background(0);
  // show all the cells in my grid
  for (var i = 0; i < grid.length; i++) {
    grid[i].show(size);
  }
  //mark the current cell as visited
  current.visited = true;
  // highlight the current cell
  current.highlight(size);
  // choose an unvisited neighbor cell to go to next in a random way
  var next = current.checkNeighbors(this.grid, this.columns, this.rows);
  // if there's an unvisited neighbor cell remove a wall and go to it
  //  and remove the border walls between them
  if (next) {
    next.visited = true;
    current.removeWalls(next);
    //push the current cell into the stack before moving to the next one
    stack.push(current);
    current = next;
  }
  //if we get stuck and the stack is not empty
  else if (stack.length > 0) {
    current = stack.pop();
  }
}
