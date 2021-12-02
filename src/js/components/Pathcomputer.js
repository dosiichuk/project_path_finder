import {classNames, select} from '../settings.js';
import {prepareAdjacentCells} from '../utils.js';

class Pathcomputer{
  constructor(stage){
    const thisPathcomputer = this;
    thisPathcomputer.buttonText = stage.buttonText;
    thisPathcomputer.dom = {};
    thisPathcomputer.paths = [[]];   
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
      const finish = document.querySelector(select.finish);
      thisPathcomputer.computePaths(start, finish);
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
    let currentCell = start;
    const cellsAdjacentToCurrentCell = prepareAdjacentCells(currentCell.dataset);
    console.log(cellsAdjacentToCurrentCell);
    cellsAdjacentToCurrentCell[0].forEach(cell => {
      if(cell.classList.contains(classNames.selected)){
        thisPathcomputer.paths.forEach(path => path.push([cell]));
        cell.classList.add(classNames.visited);
        console.log(thisPathcomputer.paths);
      }
    });
  }
}

export default Pathcomputer;