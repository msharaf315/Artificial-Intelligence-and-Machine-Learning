var tree;
function setup() {
  createCanvas(1000, 800);
  background(51);

  tree = new Tree();
  for (var i = 0; i < 10; i++) {
    tree.addNode(floor(random(0, 50)));
  }
  console.log(tree);
  tree.traverse();
}

function draw() {
  // put drawing code here
}
