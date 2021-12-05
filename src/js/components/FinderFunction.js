export const findTheShortestPath = (matrix, startCell, finishCell) => {
  const neighbors = [
    [-1, 0],
    [0, -1],
    [0, +1],
    [+1, 0]
  ];
  const matrixWidth = 10;
  const matrixLength = 10;
  
  class Node {
    constructor (point, value) {
      this.left = null;
      this.right = null;
      this.upwards = null;
      this.downward = null;
      this.value = value;
      this.point = point;
    }
  }
  
  class Graph {
    constructor () {
      this.root = null;
    }
  
    addNewNodes (pos, matrix, currentPath, currentNode) {
      const [y, x] = pos.point;
      const [finishCellRow, finishCellColumn] = finishCell;
      const moves = ((y, x, finishCellRow, finishCellColumn) => {
        switch (true) {
        case finishCellRow < y && finishCellColumn > x:
          return [neighbors[0], neighbors[2], neighbors[1], neighbors[3]];
        case finishCellRow < y && finishCellColumn < x: 
          return [neighbors[0], neighbors[1], neighbors[3], neighbors[2]];
  
        case finishCellRow > y && finishCellColumn > x:
          return [neighbors[3], neighbors[2], neighbors[0], neighbors[1]];
        case finishCellRow > y && finishCellColumn < x: 
          return [neighbors[3], neighbors[1], neighbors[2], neighbors[0]];
  
        case finishCellColumn === x && finishCellRow > y:
          return [neighbors[3], neighbors[1], neighbors[2], neighbors[0]];
        case finishCellColumn === x && finishCellRow < y:
          return [neighbors[0], neighbors[1], neighbors[2], neighbors[3]];
  
        case finishCellRow === y && finishCellColumn > x:
          return [neighbors[2], neighbors[0], neighbors[3], neighbors[1]];
        case finishCellRow === y && finishCellColumn < x:
          return [neighbors[1], neighbors[0], neighbors[3], neighbors[2]];
  
        default:
          return neighbors;
        }
      })(y, x, finishCellRow, finishCellColumn);
      if (currentPath.length === 1) {
        this.root = startPose;
        currentNode = this.root;
      }
      const path = moves.map(([yMove, xMove]) => [y + yMove, x + xMove]);
      const filter = path.filter((path) => {
        if (path[0] > matrixWidth - 1 || path[0] < 0 || path[1] > matrixLength - 1 ||
                          path[1] < 0 || matrix[path[0]][path[1]] === 1) {
          return false;
        }
        if (matrix[path[0]][path[1]] === 2) {
          this.moveNext(pos, path, currentNode, matrix);
          return false;
        }
        return currentPath.findIndex(index => index[0] === path[0] && index[1] === path[1]) === -1;
      });
      const nodeArr = filter.map(pos => {
        const node = new Node(pos, matrix[pos[0]][pos[1]]);
        if (matrix[pos[0]][pos[1]] !== 2) {
          currentPath.push(pos);
        }
        return node;
      });
  
      nodeArr.forEach((position, index) => {
        if (index === 1) {
          const index = currentPath.findIndex(index => index[0] === position.point[0] && index[1] === position.point[1]);
          currentPath = currentPath.slice(0, index + 1);
        }
        switch (true) {
        case position.point[0] < pos.point[0]:
          currentNode.downward = position;
          this.addNewNodes(position, matrix, currentPath, currentNode.downward);
          break;
        case position.point[0] > pos.point[0]:
          currentNode.upwards = position;
          this.addNewNodes(position, matrix, currentPath, currentNode.upwards);
          break;
        case position.point[1] < pos.point[1]:
          currentNode.left = position;
          this.addNewNodes(position, matrix, currentPath, currentNode.left);
          break;
        case position.point[1] > pos.point[1]:
          currentNode.right = position;
          this.addNewNodes(position, matrix, currentPath, currentNode.right);
          break;
        default:
        }
      });
    }
  
    moveNext (pos, path, currentNode, matrix) {
      const node = new Node(path, matrix[path[0]][path[1]]);
      switch (true) {
      case path[0] < pos.point[0]:
        currentNode.downward = node;
        break;
      case path[0] > pos.point[0]:
        currentNode.upwards = node;
        break;
      case path[1] < pos.point[1]:
        currentNode.left = node;
        break;
      case path[1] > pos.point[1]:
        currentNode.right = node;
        break;
      default:
      }
    }
  
    checkTheShortestPath (node, arr, shortestPath) {
      arr.push([node.value, node.point]);
      if (node.value === 2) {
        shortestPath.push([...arr]);
      }
      if (node.left) {
        this.checkTheShortestPath(node.left, arr, shortestPath);
      }
      if (node.right) {
        this.checkTheShortestPath(node.right, arr, shortestPath);
      }
      if (node.upwards) {
        this.checkTheShortestPath(node.upwards, arr, shortestPath);
      }
      if (node.downward) {
        this.checkTheShortestPath(node.downward, arr, shortestPath);
      }
      arr.pop();
      if (!arr.length) {
        return shortestPath;
      }
    }
  }
  const startPose = new Node([startCell[0], startCell[1]], matrix[startCell[0]][startCell[1]]);
  const graph = new Graph();
  graph.addNewNodes(startPose, matrix, [[startCell[0], startCell[1]]]);
  const shortestPath = graph.checkTheShortestPath(graph.root, [], []);
  const shortestPathSorted = shortestPath => (shortestPath.length) ? shortestPath.sort((a, b) => a.length - b.length)[0] : false;
  
  return shortestPathSorted(shortestPath);
};