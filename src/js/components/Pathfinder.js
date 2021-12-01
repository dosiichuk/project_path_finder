import {templates} from '../settings.js';

class Pathfinder{
  constructor(wrapperElement){
    const thisPathfinder = this;
    thisPathfinder.render(wrapperElement);
  }
  render(wrapperElement){
    const thisPathfinder = this;
    
    const cellData = {cells: []};
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
}

export default Pathfinder;