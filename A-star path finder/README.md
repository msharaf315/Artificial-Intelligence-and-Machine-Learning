# Intelligence-and-Learning

This is a repository where I will keep all my projects for the intelligence and Learning course by Daniel Shiffman where I will learn about AI, Machine learning and Deep learning using java script with ml5, TenserFlow.js and p5.js libraries

# A\* pathfinder

A\* algorithm uses heuristics to try to find a path between two points in an efficient way.
we can decide the best next jumping point to reach our final destination by using:
f(n) = g(n) + h(n)
total cost = cost between the current point and the next point + "educated guess" cost from the next point to the destination point
our guess h(n) should not over estimate or under estimate the total cost to the end point
