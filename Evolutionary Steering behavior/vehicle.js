//  the mutation rate
mutationRate = 0.01;
// The "Vehicle" class
class Vehicle {
  constructor(x, y, dna, health) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);

    // r is the size prop erty
    this.r = 6;
    this.maxspeed = 8;
    this.maxforce = 0.5;

    //the dna of the object will be the attraction to the food and the attraction of the poison
    this.dna = [];
    // if there's no dna passed create a random dna
    if (dna === undefined) {
      // the food attraction dna
      this.dna[0] = random(-2, 2);
      // the poison attraction dna
      this.dna[1] = random(-2, 2);
      // the food perception
      this.dna[2] = random(0, 100);
      // the poison perception
      this.dna[3] = random(0, 100);
      // the health of the vehicle
      this.health = 1;
    }
    //  else mutate the dna passed
    else {
      // the food attraction dna
      if (random(1) < mutationRate) this.dna[0] = random(-2, 2);
      this.dna[0] = dna[0];
      // the poison attraction dna
      if (random(1) < mutationRate) this.dna[1] = random(-2, 2);
      this.dna[1] = dna[1];
      // the food perception
      if (random(1) < mutationRate) this.dna[2] = random(0, 100);
      this.dna[2] = dna[2];
      // the poison perception
      if (random(1) < mutationRate) this.dna[3] = random(0, 100);
      this.dna[3] = dna[3];
      // the health of the vehicle
      this.health = 1;
    }
  }

  dead() {
    return this.health < 0 || this.health == 0;
  }

  // Method to update location
  update() {
    this.health -= 0.01;
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }
  // calculate the attraction force to poison and applies it
  behaviors(good, bad) {
    var steerGood = this.eat(good, 0.3, this.dna[2]);
    var steerBad = this.eat(bad, -0.02, this.dna[3]);
    steerGood.mult(this.dna[0]);
    steerBad.mult(this.dna[1]);
    this.applyForce(steerGood);
    this.applyForce(steerBad);
  }

  // loops over food and seeks the closest one it can see
  // when its close enough it eats it
  // and that affects its health depending on the value passed
  eat(list, nutrition, perception) {
    var bestDistance = Infinity;
    var eatIndex = -1;
    var seekIndex = -1;
    for (var i = 0; i < list.length; i++) {
      var distance = this.position.dist(list[i]);
      if (distance < bestDistance) {
        bestDistance = distance;
        eatIndex = i;
        if (distance < perception) seekIndex = i;
      }
    }
    //if its within our size eat it
    if (bestDistance < this.r) {
      list.splice(eatIndex, 1);
      this.health += nutrition;
    }
    //else if it exists seek it
    else if (seekIndex != -1) {
      return this.seek(list[seekIndex]);
    }
    return createVector(0, 0);
  }

  //reproduce
  reproduce() {
    if (random(1) < 0.005)
      return new Vehicle(
        this.position.x,
        this.position.y,
        this.dna,
        this.health
      );
    else {
      null;
    }
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
  }
  // A force to keep it on screen
  boundaries() {
    var d = 10;
    var desired = null;
    if (this.position.x < d) {
      desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - d) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    }

    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > height - d) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired.setMag(this.maxspeed);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }
  // the show function
  display() {
    // Draw a triangle rotated in the direction of velocity
    var angle = this.velocity.heading() + PI / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    if (debug.checked()) {
      // draw the food and poison attraction lines
      noFill();
      strokeWeight(2);
      stroke(0, 255, 0);
      line(0, 0, 0, -this.dna[0] * 30);
      ellipse(0, 0, this.dna[2] * 2);
      strokeWeight(1);
      stroke(255, 0, 0);
      line(0, 0, 0, -this.dna[1] * 30);
      ellipse(0, 0, this.dna[3] * 2);
    }

    // color the vehicles according to their hp
    var greenColor = color(0, 255, 0);
    var redColor = color(255, 0, 0);
    var colour = lerpColor(redColor, greenColor, this.health);
    fill(colour);
    stroke(colour);
    // draws the triangle of the vehicle
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);

    pop();
  }
}
