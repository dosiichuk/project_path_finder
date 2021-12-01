import {templates, select, classNames, stages} from '../settings.js';

class Pathfinder{
  constructor(wrapperElement){
    const thisPathfinder = this;
    thisPathfinder.render(wrapperElement);
    thisPathfinder.getElements();
    thisPathfinder.initActions();
    thisPathfinder.firstSelectedCell = false;
    thisPathfinder.stage = stages.endDrawing;
    console.log(thisPathfinder.stage.buttonText);
    thisPathfinder.selectedCells = [];
    thisPathfinder.cellsAvailableForSelection = [];
  }
  render(wrapperElement){
    const thisPathfinder = this;
    const cellData = {cells: [], buttonText: 'End drawing'};
    for (let i=1; i<=10; i++){
      for(let j=1; j<=10; j++){
        cellData.cells.push({
          row: i,
          column: j
        });
      }
    }
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
          this.addAdjacentCells(event.target.dataset);
          event.target.classList.toggle(classNames.selected);
        }else if(!event.target.classList.contains(classNames.available)){
          alert('This cell is not adjacent to the already selected ones, please choose a different cell');
        }else if(event.target.classList.contains(classNames.available)){
          event.target.classList.remove(classNames.available);
          event.target.classList.toggle(classNames.selected);
          this.addAdjacentCells(event.target.dataset);
        }
      });
    }
  }
  addAdjacentCells(dataset){
    const thisPathfinder = this;
    let row = parseInt(dataset.row);
    let column = parseInt(dataset.column);
    let cellAboveTheSelectedCell = document.querySelector(`.cell[data-row="${row - 1}"][data-column="${column}"]`);
    let cellBelowTheSelectedCell = document.querySelector(`.cell[data-row="${row + 1}"][data-column="${column}"]`);
    let cellRightOfTheSelectedCell = document.querySelector(`.cell[data-row="${row}"][data-column="${column + 1}"]`);
    let cellLeftOfTheSelectedCell = document.querySelector(`.cell[data-row="${row}"][data-column="${column - 1}"]`);
    const adjacentCells = [cellAboveTheSelectedCell, cellBelowTheSelectedCell, cellRightOfTheSelectedCell, cellLeftOfTheSelectedCell];
    adjacentCells.forEach(cell => {
      if(cell && !cell.classList.contains(classNames.selected) && !cell.classList.contains(classNames.available)){
        thisPathfinder.cellsAvailableForSelection.push(cell);
        cell.classList.add(classNames.available);
      }
    });
    console.log(thisPathfinder.cellsAvailableForSelection);

  }

}

export default Pathfinder;