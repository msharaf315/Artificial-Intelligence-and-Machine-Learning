var data;
var graph;
//uns before setup
function preload() {
  data = loadJSON("kevinbacon.json");
}
//runs at the start of the program
function setup() {
  //creating a new graph to keep all the nodes in
  graph = new Graph();
  noCanvas();
  //getting the movies from our data
  var movies = data.movies;
  //looping on all movies creating a node for each movie and a node for each actor
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i].title;
    var cast = movies[i].cast;
    var movieNode = new Node(movie);
    graph.addNode(movieNode);
    for (var j = 0; j < cast.length; j++) {
      var actor = cast[j];
      var actorNode = graph.getNode(actor);
      if (actorNode == undefined) {
        actorNode = new Node(actor);
        graph.addNode(actorNode);
      }
      //connects the two nodes together
      movieNode.connect(actorNode);
    }
  }
  //searches for two actors
  graph.search(graph.graph["Rachel McAdams"], graph.graph["Kevin Bacon"]);
}
