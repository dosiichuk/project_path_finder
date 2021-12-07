import {appSettings, classNames, select} from '../settings.js';
import {prepareAdjacentCells} from '../utils.js';
import Modal from './Modal.js';
import {findTheShortestPath} from './FinderFunction.js';

class Pathcomputer{
  constructor(stage){
    const thisPathcomputer = this;
    thisPathcomputer.dom = {};
    thisPathcomputer.randomPath = [];
    thisPathcomputer.randomPaths = [];
    thisPathcomputer.shortestDistance = false;
    thisPathcomputer.longestDistance = 'NA';
    thisPathcomputer.fullRoute = false;
    thisPathcomputer.shortestPath = [];
    thisPathcomputer.dom.cells = thisPathcomputer.getCells();
    thisPathcomputer.dom.wrapper = document.querySelector(select.pathfinderWrapper);
    thisPathcomputer.render(stage);
    thisPathcomputer.initActions();
    thisPathcomputer.start = false;
    thisPathcomputer.finish = false;
    
  }
  getCells(){
    const cells = document.querySelectorAll(select.all.cells);
    return cells;
  }
  render(stage){
    const thisPathcomputer = this;
    if(stage === 2){
      const markup = Array.from(thisPathcomputer.dom.cells).map(cell => cell.outerHTML).join('');
      thisPathcomputer.dom.wrapper.innerHTML = markup;
    }else if(stage === 3){
      const start = document.querySelector(select.start);
      for(let numSim = 0; numSim <= appSettings.numberOfPathSimulations; numSim++){
        thisPathcomputer.generateRandomPath(start);
      }
      const pathInvolvingFinish = thisPathcomputer.randomPaths.filter(path => path.some(cell => cell.classList.contains(classNames.finish)));

      const [matrix, startCoords, finishCoords] = thisPathcomputer.createMatrixRepresentationOfPathFinder();
      thisPathcomputer.shortestPath = findTheShortestPath(matrix, startCoords, finishCoords);
      
      thisPathcomputer.highlightTheShortestPath(thisPathcomputer.shortestPath);
      thisPathcomputer.shortestDistance = thisPathcomputer.shortestPath.length - 1;

      const pathLength = pathInvolvingFinish.map(path => path.length);
      
      thisPathcomputer.longestPath = pathInvolvingFinish[pathLength.indexOf(Math.max(...pathLength))];
      thisPathcomputer.longestDistance = thisPathcomputer.longestPath.length;
      thisPathcomputer.fullRoute = document.getElementsByClassName(classNames.selected).length;
      new Modal(document.querySelector(select.wrapperOf.modal), thisPathcomputer.fullRoute, thisPathcomputer.longestDistance, thisPathcomputer.shortestDistance);
    }    
  }
  initActions(){
    const selectedCells = Array.from(document.getElementsByClassName(classNames.selected));
    selectedCells.forEach(
      cell => {cell.addEventListener('click', (event) => {
        if(!this.start && !this.finish && !event.target.classList.contains(classNames.finish)){
          event.target.classList.add(classNames.start);
          this.start = event.target;
        }else if(this.start && !this.finish && !event.target.classList.contains(classNames.start)){
          event.target.classList.add(classNames.finish);
          this.finish = event.target;
        }else if(!this.start && this.finish && !event.target.classList.contains(classNames.finish)){
          event.target.classList.add(classNames.start);
          this.start = event.target;
        }else if(event.target.classList.contains(classNames.start)){
          event.target.classList.toggle(classNames.start);
          this.start = false;
        }else if(event.target.classList.contains(classNames.finish)){
          event.target.classList.toggle(classNames.finish);
          this.finish = false;
        }      
      });
      }
    );
  }
  
  generateRandomPath(start){
    const thisPathcomputer = this;
    let currentCell = start;
    let cellsAdjacentToCurrentCell = prepareAdjacentCells(currentCell.dataset);
    cellsAdjacentToCurrentCell = cellsAdjacentToCurrentCell[0].filter(cell => cell !== null);
    cellsAdjacentToCurrentCell = cellsAdjacentToCurrentCell.filter(cell => cell.classList.contains(classNames.selected) && !cell.classList.contains(classNames.visited));
    for(let i=0; i<cellsAdjacentToCurrentCell.length; i++){
      if(currentCell.classList.contains(classNames.finish)) break;
      currentCell.classList.add(classNames.visited);
      let nextCell = cellsAdjacentToCurrentCell[Math.floor(Math.random() * cellsAdjacentToCurrentCell.length)];
      if(!nextCell.classList.contains(classNames.visited)){
        this.randomPath.push(nextCell);
      }
      currentCell = nextCell;
      if(nextCell.classList.contains(classNames.finish) || nextCell.classList.contains(classNames.visited)){
        break;
      }else{
        thisPathcomputer.generateRandomPath(nextCell);
      }
    }
    thisPathcomputer.randomPaths.push(thisPathcomputer.randomPath);
    thisPathcomputer.randomPath = [];
    thisPathcomputer.dom.cells.forEach(cell => cell.classList.remove(classNames.visited));
    return;
  }

  createMatrixRepresentationOfPathFinder(){
    const thisPathcomputer = this;
    let matrix = new Array(10).fill([]);
    for(let i=0; i<10; i++){
      let matchingCells = Array.from(thisPathcomputer.dom.cells).filter(cell => parseInt(cell.dataset.row) === i+1);
      matrix[i] = matchingCells;
    }
    matrix = matrix.map(row => row.map(cell => {
      if(cell.classList.contains(classNames.selected)){
        return 0;
      }else{
        return 1;
      }
    }));
    const startFinish = thisPathcomputer.identifyStartAndFinish(thisPathcomputer.dom.cells);
    matrix[startFinish[1][0] - 1][startFinish[1][1] - 1] = 2;
    return [matrix, startFinish[0], startFinish[1]];    
  }

  highlightTheShortestPath(path){
    const thisPathcomputer = this;
    for(let item of path.slice(1)){
      Array.from(thisPathcomputer.dom.cells).forEach(cell => {
        if(parseInt(cell.dataset.row) == item[1][0] + 1 && parseInt(cell.dataset.column) == item[1][1] + 1){
          cell.classList.add(classNames.shortest);
        }
      });
    }
  }
  
  identifyStartAndFinish(cells){
    let start, finish;
    for(let cell of Array.from(cells)){
      if(cell.classList.contains(classNames.start)){
        start = [parseInt(cell.dataset.row), parseInt(cell.dataset.column)];
      }
      if(cell.classList.contains(classNames.finish)){
        finish = [parseInt(cell.dataset.row), parseInt(cell.dataset.column)];
      }
    }
    return [start, finish];
  }

}

export default Pathcomputer;