# Intelligence-and-Learning
This is a repository where I will keep all my projects for the intelligence and Learning course by Daniel Shiffman where I will learn about AI, Machine learning and Deep learning using java script with ml5, TenserFlow.js and p5.js libraries 

# Maze Generator
This is a maze generator program that uses p5.js for the front end and javascript as a back end where I use depth first search and backtracking to create a random maze using
this pseudo code
Start with a grid that has no edges (all walls)
Make the initial cell the current cell
Push the current cell to the stack and mark it as visited
While the stack is not empty
  If the current cell has unvisited neighbors
    Choose one of these neighbors randomly
    Remove the wall (add an edge) between the current cell and the chosen neighbor
    Push the neighbor to the stack and mark it as visited
    Make the neighbor the current cell
   Else
    Pop a cell from the stack and make it the current cell

Backtracking occurs when there are no more unvisited neighbors of the current cell. In that case the algorithm pops cells from the stack until it finds a cell with an unvisited neighbor from which a new branch is started.	