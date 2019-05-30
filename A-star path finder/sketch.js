//declaring the rows and columns of our grid
var columns = 50;
var rows = 50;
var grid = new Array(columns);
//we are going to store all possible unsearched spots in the openSet
var openSet = [];
//and all the searched spots in closedSet
var closedSet = [];
//define variables to calculate the spacing between spots
var w, h;
//the path to the end
var path = [];
//create an index to save the location of the best jumping point
var bestSpotIndex;
//the current spot
var current;
//signal the finishing of the search to stop the loop
var done = false;

//calculate the distance between an input node and the target node
// this gusses the distance between them if we just moved in a straight line  towards the target
// while this is almost never true but its a good guess as the distance will never be less than that
function heuristic(node, target) {
  var distance = dist(node.i, node.j, target.i, target.j);
  return distance;
}
//checks if there is still any reachable spots then evaluates them all to find the cheapest one
//to jump to according to distance between the current spot and that spot plus our
// heuristic which is the diagonal distance between that spot and the target
// and make that spot the current spot
// if the current spot is the target we are done if not jumps to the cheapest spot that is reeachable
// if there is no more reachable spots and we didnt find our target then there is no path to that target
function search(start, end) {
  bestSpotIndex = 0;
  if (openSet.length > 0) {
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[bestSpotIndex].f) {
        bestSpotIndex = i;
      }
    }
    current = openSet[bestSpotIndex];
    //if we found the target  return
    if (current == target) {
      done = true;
      return;
    }
    //remove the current spot from the openSet and push it into the closed set
    removeFromArray(openSet, current);
    closedSet.push(current);
    // evaluate neighbor and choose the best next jump
    var neighbors = current.edges;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.obstacle) {
        tempG = current.g + 1;
        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else if (!neighbor.obstacle) {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }
        if (newPath) {
          neighbor.h = heuristic(neighbor, target);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }
  } else {
    console.log("no solution");
    done = true;
    return;
  }
}

//remove a target spot from an array
function removeFromArray(array, target) {
  for (var i = array.length; i >= 0; i--) {
    if (array[i] == target) array.splice(i, 1);
  }
}

function setup() {
  // put setup code here
  createCanvas(400, 400);

  //calculate the spaces between spots
  w = width / columns;
  h = height / rows;

  //create a grid of 2d Array
  for (var i = 0; i < columns; i++) {
    grid[i] = new Array(rows);
  }

  //fill the grid with spots
  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  //connect all the spots together
  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].connect(
        grid,
        rows,
        columns
      );
    }
  }
  //define the start and target point to searched
  start = grid[0][0];
  target = grid[columns - 1][rows - 1];
  // make sure that the target and the start are not obstacles
  start.obstacle = false;
  target.obstacle = false;
  //push the start to the visitable array
  openSet.push(start);
}

function draw() {
  // put drawing code here
  background(255, 255, 255);

  //call the search if the search wasnt over before
  if (!done) search(start, target);

  //draw all the cells
  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].obstacle) grid[i][j].show(w, h, color(255, 255, 255, 255));
    }
  }
  // // draw the cells we have visited
  // for (var i = 0; i < closedSet.length; i++) {
  //   closedSet[i].show(w, h, color(255, 0, 0, 255));
  // }
  // // draw the spots that could be visited
  // for (var i = 0; i < openSet.length; i++) {
  //   openSet[i].show(w, h, color(0, 255, 0, 255));
  // }
  // draw the path
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.parent) {
    path.push(temp.parent);
    temp = temp.parent;
  }
  beginShape();
  for (var i = 0; i < path.length; i++) {
    noFill();
    stroke(0, 255, 0);
    strokeWeight(w / 2);
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();

  //draw the current spot
  current.show(w, h, color(255, 255, 0, 255));
  // color the target spot differently
  target.show(w, h, color(255, 255, 0, 255));
  // if done stop looping
  if (done) {
    noLoop();
    return;
  }
}
