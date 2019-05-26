//constructor for the Cell object
function Cell(i, j) {
  this.i = i;
  this.j = j;
  //           top, right, bottom,left walls
  this.walls = [true, true, true, true];
  visited = false;
}
//draws the cell with the given size
Cell.prototype.show = function(size) {
  var x = this.i * size;
  var y = this.j * size;
  stroke(255, 105, 180);
  // check if this cell has a wall in that position before drawing them
  if (this.walls[0]) line(x, y, x + size, y);
  if (this.walls[1]) line(x + size, y, x + size, y + size);
  if (this.walls[2]) line(x + size, y + size, x, y + size);
  if (this.walls[3]) line(x, y + size, x, y);

  //changes the color of the visited cell
  if (this.visited) {
    noStroke();
    fill(255, 0, 255, 100);
    rect(x, y, size, size);
  }
};

//returns the index of the cell given its i and j from the one D array
Cell.prototype.getIndex = function(i, j, columns, rows) {
  if (i < 0 || j < 0 || i > columns - 1 || j > rows - 1) return -1;
  return i + j * columns;
};

//gets the neighboring cells returns a random unvisited one
Cell.prototype.checkNeighbors = function(grid, columns, rows) {
  var neighbors = [];
  //reads the neighboring cells
  var top = grid[this.getIndex(this.i, this.j - 1, columns, rows)];
  var right = grid[this.getIndex(this.i + 1, this.j, columns, rows)];
  var bottom = grid[this.getIndex(this.i, this.j + 1, columns, rows)];
  var left = grid[this.getIndex(this.i - 1, this.j, columns, rows)];
  //checks if they were visited if not put them in the potential jumping destination array called neighbors
  if (top && !top.visited) neighbors.push(top);
  if (right && !right.visited) neighbors.push(right);
  if (bottom && !bottom.visited) neighbors.push(bottom);
  if (left && !left.visited) neighbors.push(left);
  // selects a random neighbor to visit next if there is any that is unvisited
  // checks if neighbors not empty and returns a random neighbor
  if (neighbors.length > 0) {
    var random = floor(math.random(0, neighbors.length));
    return neighbors[random];
  } else {
    return undefined;
  }
};

Cell.prototype.removeWalls = function(nextCell) {
  i = this.i - nextCell.i;
  j = this.j - nextCell.j;
  switch (i) {
    //the next wall is on current's left
    // remove current's left wall and the next's right wall
    case 1:
      this.walls[3] = false;
      nextCell.walls[1] = false;
      break;
    //the next wall is on current's right
    // remove current's right wall and the next's left wall
    case -1:
      this.walls[1] = false;
      nextCell.walls[3] = false;
      break;
  }
  switch (j) {
    //the next wall is above the current
    // remove current's top wall and the next bottom wall
    case 1:
      this.walls[0] = false;
      nextCell.walls[2] = false;
      break;
    //the next wall is below me
    // remove current's bottom wall and the next's top wall
    case -1:
      this.walls[2] = false;
      nextCell.walls[0] = false;
      break;
  }
};
//colors the current cel differently
Cell.prototype.highlight = function(size) {
  var x = this.i * size;
  var y = this.j * size;
  noStroke();
  fill(255, 0, 255, 80);
  rect(x, y, size, size);
};
