class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      node.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(current, toPrint = [], visited = new Set()) {
    // Base Case
    if (!current) {
      return null;
    }

    // Normal Case
    visited.add(current);
    toPrint.push(current.value);
    current.adjacent.forEach((relative) => {
      if (visited.has(relative) === false) {
        return this.depthFirstSearch(relative, toPrint, visited);
      }
    });
    return toPrint;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(
    current,
    queue = [current],
    toPrint = [],
    visited = new Set()
  ) {
    // Normal Case
    if (!visited.has(current)) {
      visited.add(current);
      toPrint.push(current.value);
      current.adjacent.forEach((relative) => {
        queue.push(relative);
      });
    }
    debugger;
    return queue.length
      ? this.breadthFirstSearch(queue.shift(), queue, toPrint, visited)
      : toPrint;
  }
}

module.exports = { Graph, Node };
