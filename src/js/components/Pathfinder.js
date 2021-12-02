import {templates, select, classNames, stages} from '../settings.js';
import {prepareCellData} from '../utils.js';
import {prepareAdjacentCells} from '../utils.js';

class Pathfinder{
  constructor(wrapperElement){
    const thisPathfinder = this;
    thisPathfinder.stage = stages[1];
    thisPathfinder.render(wrapperElement);
    thisPathfinder.getElements();
    thisPathfinder.initActions();
    thisPathfinder.firstSelectedCell = false;
    thisPathfinder.selectedCells = [];
    thisPathfinder.cellsAvailableForSelection = [];
  }
  render(wrapperElement){
    const thisPathfinder = this;
    const buttonText = thisPathfinder.stage.buttonText;
    console.log(buttonText);
    const cellData = prepareCellData(buttonText);
    const generatedHtml = templates.pathfinder(cellData);
    thisPathfinder.dom = {};
    thisPathfinder.dom.wrapper = wrapperElement;
    thisPathfinder.dom.wrapper.innerHTML = generatedHtml;
  }
  getElements(){
    const thisPathfinder = this;
    thisPathfinder.dom.cells = document.querySelectorAll(select.all.cells);
    thisPathfinder.dom.stageButton = document.getElementsByClassName(classNames.stageButton);
  }
  initActions(){
    const thisPathfinder = this;
    for(let cell of thisPathfinder.dom.cells){
      cell.addEventListener('click', (event) => {
        console.log(event.target);
        if(!thisPathfinder.firstSelectedCell){
          thisPathfinder.firstSelectedCell = event.target;
          this.selectedCells.push(event.target);
          this.modifyAdjacentCells(event.target.dataset, 'add');
          event.target.classList.toggle(classNames.selected);
        }else if(!event.target.classList.contains(classNames.available) && !event.target.classList.contains(classNames.selected)){
          alert('This cell is not adjacent to the already selected ones, please choose a different cell');
        }else if(event.target.classList.contains(classNames.available)){
          event.target.classList.remove(classNames.available);
          event.target.classList.toggle(classNames.selected);
          this.modifyAdjacentCells(event.target.dataset, 'add');
        }else if(event.target.classList.contains(classNames.selected)){
          if(thisPathfinder.checkForBreak(prepareAdjacentCells(event.target.dataset))){
            alert('You cannot remove this cell, because it will create a break in the path');
          }else{
            event.target.classList.toggle(classNames.selected);
            this.modifyAdjacentCells(event.target.dataset, 'remove');
            prepareAdjacentCells(event.target.dataset)[1].forEach(cell => {
              if(cell.classList.contains(classNames.selected)){
                this.modifyAdjacentCells(cell.dataset, 'add');
              }
            });
          }
        }
      });
    }
  }
  
  modifyAdjacentCells(dataset, operation){
    const thisPathfinder = this;
    const [adjacentCells] = prepareAdjacentCells(dataset);
    if(operation === 'add'){
      adjacentCells.forEach(cell => {
        if(cell && !cell.classList.contains(classNames.selected) && !cell.classList.contains(classNames.available)){
          thisPathfinder.cellsAvailableForSelection.push(cell);
          cell.classList.add(classNames.available);
        }
      });
    }else{
      adjacentCells.forEach(cell => {
        if(cell && !cell.classList.contains(classNames.selected) && cell.classList.contains(classNames.available)){
          thisPathfinder.cellsAvailableForSelection.pop(cell);
          cell.classList.remove(classNames.available);
        }
        if(cell && cell.classList.contains(classNames.selected)){
          this.modifyAdjacentCells(cell.dataset, 'add');
        }
      });
    }
  }
  checkForBreak([adjacentCells, cornerCells]){
    console.log('inside checkforbreask, corner cells', cornerCells);
    //this function check whether two of the adjacent cells are selected, while the two remaining are not
    if((adjacentCells[0].classList.contains(classNames.selected) && 
    adjacentCells[1].classList.contains(classNames.selected) && 
    !adjacentCells[2].classList.contains(classNames.selected) && 
    !adjacentCells[3].classList.contains(classNames.selected))
  || (adjacentCells[2].classList.contains(classNames.selected) &&
  adjacentCells[3].classList.contains(classNames.selected) &&
   !adjacentCells[0].classList.contains(classNames.selected) &&
   !adjacentCells[1].classList.contains(classNames.selected)) ||
   cornerCells.length == 1){
      return true;
    }else{
      return false;
    }
  }
}

export default Pathfinder;