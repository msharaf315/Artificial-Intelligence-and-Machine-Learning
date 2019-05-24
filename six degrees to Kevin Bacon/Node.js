function Node(value) {
  this.value = value;
  this.edges = [];
  this.searched = false;
  this.parent = null;
}
//connects two edges if they are not already connected
Node.prototype.connect = function(node) {
  if (!this.edges.includes(node)) {
    this.edges.push(node);
  }
  if (!node.edges.includes(this)) {
    node.edges.push(this);
  }
};
