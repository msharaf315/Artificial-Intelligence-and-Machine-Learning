//  the mutation rate
var mutationRate = 0.01;
// a counter to keep track of the generation and the generation where we found the best answer
var generationCounter = 0;
var foundIn = 0;

// loop over the population and calculaes their fitness  recording the highest fitness
function calculateFitness() {
  var currentRecord = Infinity;
  // loops over the population of random orders and calculates the fitness of each order
  for (var i = 0; i < population.length; i++) {
    var distance = calculateDistance(cities, population[i]);
    // updates the best order and best distance when found
    if (distance < recordDistance) {
      recordDistance = distance;
      recordPath = population[i];
      foundIn = generationCounter;
      console.log(foundIn);
    }
    // updates the best order of each generation
    if (distance < currentRecord) {
      currentRecord = distance;
      generationBest = population[i];
    }
    //calculates the fitness of the current order and stores it
    fitness[i] = (1 / (distance * distance)) ^ 2;
  }
}

// normalize the fitness as a ratio of the total fitness of the population
function normalizeFitness() {
  var sum = 0;
  for (var i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (var i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;
  }
}

// pick from the population at random according to their fitness
function pickOne(array, probability) {
  var index = 0;
  var random = math.random();
  while (random > 0) {
    random = random - probability[index];
    index++;
  }
  index--;
  return array[index].slice();
}

// cross over function that mixes the dna of two orders
function crossOver(firstItem, secondItem) {
  var child = [];
  start = floor(math.random(firstItem.length));
  counter = floor(math.random(start, firstItem.length));
  child = firstItem.slice(start, counter);
  for (var i = 0; i < secondItem.length; i++) {
    if (!child.includes(secondItem[i])) child.push(secondItem[i]);
  }
  return child;
}

// mutate
function mutate(order) {
  for (var i = 0; i < totalCities; i++) {
    if (math.random(1) < mutationRate) {
      var firstIndex = floor(math.random(order.length));
      var secondIndex = (firstIndex + 1) % totalCities;
    }
    swap(order, firstIndex, secondIndex);
  }
}

// creates the next generation
function nextGeneration() {
  var newPopulation = [];
  for (var i = 0; i < population.length; i++) {
    var firstOrder = pickOne(population, fitness);
    var secondOrder = pickOne(population, fitness);
    var order = crossOver(firstOrder, secondOrder);
    mutate(order);
    newPopulation[i] = order;
  }
  population = newPopulation;
  generationCounter++;
}
