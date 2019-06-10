var cities = [];
var totalCities = 12;

//the best order
var recordDistance = Infinity;
var recordPath;

//best order of the current generation
var generationBest = [];
//the population of multiple orders
var populationSize = 5000;
var population = [];
// the fitness of an item of the population
var fitness = [];

//a function that swaps two elemnts in an array
function swap(array, firstIndex, secondIndex) {
  temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}

// a function that swaps two elemnts in a lexicographic order

function calculateDistance(array, order) {
  sum = 0;
  for (var i = 0; i < order.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = array[cityAIndex];
    var citybIndex = order[i + 1];
    var cityB = array[citybIndex];

    var distance = cityA.dist(cityB);
    sum += distance;
  }
  return sum;
}

function factorial(n) {
  if (n == 1) return 1;
  else {
    return n * factorial(n - 1);
  }
}

function setup() {
  var order = [];
  // put setup code here
  createCanvas(1400, 625);

  //create cities
  for (var i = 0; i < totalCities; i++) {
    var vector = createVector(random(width), random(height / 2));
    cities[i] = vector;
    order[i] = i;
  }

  // fill the population
  //  with random orders
  for (var i = 0; i < populationSize; i++) {
    population[i] = shuffle(order);
  }
}

function draw() {
  // put drawing code here
  // noLoop();
  // frameRate(1);
  //draw all the points
  background(0);

  // genetic algorithm

  // calculate the fitness of the population
  calculateFitness();
  //normalize the fitness into a ratio
  normalizeFitness();
  //  create the next generation
  nextGeneration();

  //draw the record path
  stroke(0, 255, 0);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < recordPath.length; i++) {
    var n = recordPath[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 8, 8);
  }
  endShape();

  //draw the best of the generation
  translate(0, height / 2);
  stroke(0, 255, 0);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < generationBest.length; i++) {
    var n = generationBest[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 8, 8);
  }
  endShape();
}
