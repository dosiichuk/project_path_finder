import {classNames, select} from '../settings.js';
import {prepareAdjacentCells} from '../utils.js';
import Modal from './Modal.js';

class Pathcomputer{
  constructor(stage){
    const thisPathcomputer = this;
    thisPathcomputer.buttonText = stage.buttonText;
    thisPathcomputer.dom = {};
    thisPathcomputer.paths = [];
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
      //   const finish = document.querySelector(select.finish);
      thisPathcomputer.computePaths(start);
      thisPathcomputer.indicateShortestPath(thisPathcomputer.paths);
      thisPathcomputer.shortestPath.forEach(cell => cell.classList.add(classNames.shortest));
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
  computePaths(start){
    const thisPathcomputer = this;
    console.log('start cell', start);
    let currentCell = start;
    if(!currentCell.classList.contains(classNames.finish)){
      currentCell.classList.add(classNames.visited);
    }
    
    let cellsAdjacentToCurrentCell = prepareAdjacentCells(currentCell.dataset);
    console.log('before filter', cellsAdjacentToCurrentCell);
    cellsAdjacentToCurrentCell = cellsAdjacentToCurrentCell[0].filter(cell => cell !== null);
    cellsAdjacentToCurrentCell = cellsAdjacentToCurrentCell.filter(cell => cell.classList.contains(classNames.selected) && !cell.classList.contains(classNames.visited));
    console.log('after filter', cellsAdjacentToCurrentCell);
    thisPathcomputer.paths.push(cellsAdjacentToCurrentCell);
    console.log('paths after iteration', thisPathcomputer.paths);
    cellsAdjacentToCurrentCell.forEach(cell => {
      thisPathcomputer.computePaths(cell);
    });
    
    console.log('paths are', thisPathcomputer.paths);
    return thisPathcomputer.paths;
  }
  indicateShortestPath(paths){
    const thisPathcomputer = this;
    thisPathcomputer.shortestDistance = paths.map(path => path.some(cell => cell.classList.contains(classNames.finish))).indexOf(true) + 1;
    thisPathcomputer.longestDistance = paths.map(path => path.some(cell => cell.classList.contains(classNames.finish))).indexOf(true, -1) + 1;
    console.log('the first occurence of finish is in arr', thisPathcomputer.shortestDistance, thisPathcomputer.longestDistance);
    paths.forEach(path => {
      if(paths.indexOf(path) < thisPathcomputer.shortestDistance && path.length > 0){
        thisPathcomputer.shortestPath.push(path[0]);
      }
    });
    console.log('the sectors to go are', thisPathcomputer.shortestPath);
  }
}

export default Pathcomputer;