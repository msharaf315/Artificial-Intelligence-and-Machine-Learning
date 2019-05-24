function Graph() {
  //keep track of all the nodes
  this.nodes = [];
  this.graph = {};
  // instead of implementing a queue data structure we are gonna use an array
  this.queue = [];
  //this is where we are going to keep our trace of parents so we can loop back to our start and draw the path to kevin bacon
  this.parentsArray = [];
}

//adds a node into our graph
Graph.prototype.addNode = function(node) {
  this.nodes.push(node);
  var title = node.value;
  // putting a node into the title index into the graph array
  this.graph[title] = node;
};

// returns a node from the array given the name of the acotr or movie
Graph.prototype.getNode = function(actor) {
  var node = this.graph[actor];
  return node;
};

//prints our search path
Graph.prototype.drawTheTrace = function(result) {
  var text = "";
  //loops through all the nodes we have been through and adds it to a text
  for (i = result.length - 1; i >= 0; i--) {
    var node = result[i];
    text += node.value;
    if (!i == 0) {
      text += "-->";
    }
  }
  //a p5 function that draws a paragraph
  createP(text);
};

//if we found our target adds all the nodes we visited to reach our target to an array
Graph.prototype.traceParents = function(node) {
  //adds the first node to our array
  this.parentsArray.push(node);
  var next = node.parent;
  // adds every parent node to our array untill we reach the starting node
  while (next !== null) {
    this.parentsArray.push(next);
    next = next.parent;
  }
  // calls the draw Trace function
  this.drawTheTrace(this.parentsArray);
  return this.parentsArray;
};

//searches for a target node from a start node
Graph.prototype.search = function(start, target) {
  var currentNode;
  //loops through all the edges of the current node searching for the target
  for (var i = 0; i < start.edges.length; i++) {
    currentNode = start.edges[i];
    // if target is found add the last node as its parent and call the trace parents to draw the path from the start to the target node
    if (currentNode.value == target.value) {
      target.parent = start;
      var result = this.traceParents(target);
      console.log(result);
      return result;
    } else {
      //if the current node is not connected to the target we mark is as searched and add the current edge to search queue
      if (!currentNode.searched) {
        start.searched = true;
        this.queue.push(currentNode);
        currentNode.parent = start;
      }
    }
  }
  //if we searched all the edges and not found any connection return null else search from the start of the queue
  if (this.queue.length == 0) {
    console.log("there is no connection");
    return null;
  } else {
    this.search(this.queue.shift(), target);
  }
};
