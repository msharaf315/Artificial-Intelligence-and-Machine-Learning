function Spot(i, j) {
  //coordinates
  this.i = i;
  this.j = j;

  //the f g and h score
  this.f = 0;
  this.g = 0;
  this.h = 0;

  //define if its an obstacle or note
  this.obstacle = false;
  // define the percentage of the spots are obstacle
  if (random(1) < 0.4) {
    this.obstacle = true;
  }
  //creates an array of neighbor spots
  this.edges = [];
  //keep track of the parent
  this.parent = null;
}

//connects neighbors from a grid
Spot.prototype.connect = function(grid, columns, rows) {
  // add the neighbor to the right
  if (this.i != columns - 1) this.edges.push(grid[this.i + 1][this.j]);
  // add the neighbor to the left
  if (this.i != 0) this.edges.push(grid[this.i - 1][this.j]);
  // add the neighbor below
  if (this.j != rows - 1) this.edges.push(grid[this.i][this.j + 1]);
  // add the neighbor above
  if (this.j != 0) this.edges.push(grid[this.i][this.j - 1]);
  //add the top left neighbor
  if (this.i != 0 && this.j != 0) this.edges.push(grid[this.i - 1][this.j - 1]);
  //add the top right neighbor
  if (this.i != columns - 1 && this.j != 0) {
    this.edges.push(grid[this.i + 1][this.j - 1]);
  }
  //add the bottom right neighbor
  if (this.i != columns - 1 && this.j != rows - 1) {
    this.edges.push(grid[this.i + 1][this.j + 1]);
  }
  //add the bottom left neighbor
  if (this.i != 0 && this.j != rows - 1)
    this.edges.push(grid[this.i - 1][this.j + 1]);
};

//draw the spots with given width and height and color as a distance between them
Spot.prototype.show = function(w, h, color) {
  fill(color);

  if (this.obstacle) {
    fill(0);
  }
  noStroke();
  ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
};
