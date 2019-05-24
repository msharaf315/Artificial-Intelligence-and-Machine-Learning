function Tree() {
  this.root = null;
}

Tree.prototype.traverse = function() {
  this.root.visit(this.root);
};

Tree.prototype.addNode = function(value) {
  if (this.root == null) {
    this.root = new Node(value, width / 2, 16);
  } else {
    this.root.addValue(value);
  }
};

Tree.prototype.search = function(value) {
  if (this.root == null) {
    return null;
  } else {
    if (this.root.value == value) {
      return this.root;
    } else {
      var nodeX = this.root.search(value);
      return nodeX;
    }
  }
};
