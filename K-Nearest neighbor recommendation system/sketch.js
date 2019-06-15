// our data set
var data;
var resultsP;
var resultsDiv = [];
var users = {};
var titles;

// load data from the json file
function preload() {
  data = loadJSON("Movies.json");
}

function setup() {
  noCanvas();
  var usersData = data.users;
  titles = data.titles;
  // an array that keep track of all the drop downs
  var dropDowns = [];

  // creates a hashtable holding all the data
  for (var i = 0; i < usersData.length; i++) {
    var currentUser = usersData[i];
    users[currentUser.name] = usersData[i];
  }

  // create a list of dropdowns to rate movies
  for (var i = 0; i < titles.length; i++) {
    var div = createDiv(titles[i]);
    var dropdown = createSelect();
    dropdown.parent(div);
    dropdown.option("not seen");
    for (var rating = 1; rating < 6; rating++) {
      dropdown.option(rating);
    }
    dropdown.title = titles[i];
    dropDowns.push(dropdown);
  }

  // a submit form button
  var button = createButton("submit");
  button.mousePressed(predictRatings);
  resultsP = createP("");

  //  a function that predicts the ratings acording to your submitted scores
  function predictRatings() {
    // create a user with his ratings as an attrbute
    var newUser = {};
    var nullRatings = [];
    var ratingWeighted = 0;
    var totalSimilarity = 0;
    for (var i = 0; i < dropDowns.length; i++) {
      var title = dropDowns[i].title;
      var rating = dropDowns[i].value();
      //puts the movies that the user havent seen in an array
      if (rating === "not seen") {
        rating = null;
        nullRatings.push(title);
      }
      newUser[title] = rating;
    }

    // finds the 5 nearest neighbors
    var nearestNeighbors = findNearestNeighbors(newUser);
    // loops through all the unrated movies and calculates a weighted average of the ratings of the nearest neighbors
    for (var i = 0; i < nullRatings.length; i++) {
      for (var j = 0; j < nearestNeighbors.length; j++) {
        var neighbor = nearestNeighbors[j];
        var neighborRating = neighbor[nullRatings[i]];
        totalSimilarity += neighbor.similarityScore;
        ratingWeighted += neighborRating * neighbor.similarityScore;
      }
      console.log(nullRatings[i] + " " + ratingWeighted / totalSimilarity);
    }
  }

  // finds the 5 nearest neighbors using similarity scores
  function findNearestNeighbors(userRating) {
    // clears the the gui div
    for (var i = 0; i < resultsDiv.length; i++) {
      resultsDiv[i].remove();
    }
    resultsDiv = [];
    //loops through all the db and calculates the similarity scores
    // then prints out the 5 most similar users
    var similarityScores = [];
    // creates a user object that has a similarity score and the name of the user and put it in a ist
    //  then sort the list according to the score to get the 5 nearest neighbors
    for (var i = 0; i < data.users.length; i++) {
      var other = usersData[i];
      var similarity = calculateScore(userRating, other);
      other.similarityScore = similarity;
      similarityScores[i] = other;
    }
    similarityScores.sort((a, b) =>
      a.similarityScore < b.similarityScore ? 1 : -1
    );
    // gets the first 5 elements after soritng
    similarityScores = similarityScores.splice(0, 5);
    // create a div that shows the top 5 most similar and their score
    for (var i = 0; i < similarityScores.length; i++) {
      var div = createDiv(
        similarityScores[i].name + ":" + similarityScores[i].similarityScore
      );
      resultsDiv.push(div);
      resultsP.parent(div);
    }
    return similarityScores;
  }
}

// a function that calculates the score between two reviewers
function calculateScore(ratings1, ratings2) {
  data1 = ratings1;
  data2 = ratings2;
  titles = Object.keys(data1);
  var sumSquares = 0;
  // loops through all the titles and calculates the difference between the ratings of two users
  for (var i = 0; i < titles.length; i++) {
    var title = titles[i];
    if (title !== "name" && title !== "timestamp") {
      var user1Rating = data1[title];
      var user2Rating = data2[title];
      if (user1Rating != null && user2Rating != null) {
        var difference = user1Rating - user2Rating;
        sumSquares += difference * difference;
      }
    }
  }
  var distance = sqrt(sumSquares);
  var similarity = 1 / (distance + 1);
  similarity = nf(similarity, 1, 2);
  return similarity * 100;
}
