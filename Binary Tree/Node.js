function Node(value, x, y) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.x = x;
  this.y = y;
}

Node.prototype.visit = function(parent) {
  if (this.left != null) {
    this.left.visit(this);
  }
  console.log(this.value);
  fill(255);
  ellipse(this.x, this.y, 20, 20);
  fill(0);
  noStroke();
  textAlign(CENTER);
  text(this.value, this.x, this.y);
  stroke(255);
  line(parent.x, parent.y, this.x, this.y);
  if (this.right != null) {
    this.right.visit(this);
  }
};

Node.prototype.addValue = function(value) {
  if (this.value > value) {
    if (this.left == null) {
      this.left = new Node(value, this.x - 50, this.y + 80);
    } else {
      this.left.addValue(value);
    }
  } else if (this.value < value) {
    if (this.right == null) {
      this.right = new Node(value, this.x + 50, this.y + 80);
    } else {
      this.right.addValue(value);
    }
  }
};

Node.prototype.search = function(value) {
  if (this.value == value) {
    return this;
  } else {
    if (this.value > value) {
      if (this.left == null) {
        return "not found";
      } else {
        return this.left.search(value);
      }
    } else if (this.value < value) {
      if (this.right == null) {
        return "not found";
      } else {
        return this.right.search(value);
      }
    }
  }
};
