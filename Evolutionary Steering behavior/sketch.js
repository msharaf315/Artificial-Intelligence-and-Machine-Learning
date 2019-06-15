// Implements Craig Reynold's autonomous steering behaviors
// One vehicle "seeks"
// See: http://www.red3d.com/cwr/

// a flag to show debugging gui
var debug;

// array of all the vehicles
var vehicle = [];
//array where we keep all the food and poison
var food = [];
var poison = [];

// add vehicle by draggin mouse
function mouseDragged() {
  vehicle.push(new Vehicle(mouseX, mouseY));
}

function setup() {
  createCanvas(640, 360);
  // create vehicles
  for (var i = 0; i < 100; i++) {
    vehicle[i] = new Vehicle(width / 2, height / 2);
  }
  //create food at random locations
  for (var i = 0; i < 150; i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }

  //create poison at random locations
  for (var i = 0; i < 20; i++) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }
  debug = createCheckbox();
}

function draw() {
  // frameRate(20);
  background(51);
  // a chance each frame to create food
  if (random(1) < 0.1) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }

  // a chance each frame to create poison
  if (random(1) < 0.01) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }

  //draw the food
  for (var i = 0; i < food.length; i++) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 8, 8);
  }

  //draw the poison
  for (var i = 0; i < poison.length; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 8, 8);
  }

  // apply the behavior of each vehicle
  for (var i = vehicle.length - 1; i >= 0; i--) {
    //  make sure the vehicles dont steer outside the window
    vehicle[i].boundaries();
    //apply the behavior of the vehicle
    vehicle[i].behaviors(food, poison);
    // reduces the health each second and updates the location
    vehicle[i].update();
    // shows the vehicle
    vehicle[i].display();
    // removes a vehicle from the array and places a food at its position
    if (vehicle[i].dead()) {
      food.push(createVector(vehicle[i].position.x, vehicle[i].position.y));
      vehicle.splice(i, 1);
    }
    // reproduces
    if (vehicle[i] != null) var newVehicle = vehicle[i].reproduce();
    if (newVehicle != null) vehicle.push(newVehicle);
  }
  // vehicle.seek();
}
