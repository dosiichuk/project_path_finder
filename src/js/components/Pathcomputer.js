import {select} from '../settings.js';

class Pathcomputer{
  constructor(stage){
    const thisPathcomputer = this;
    thisPathcomputer.buttonText = stage.buttonText;
    thisPathcomputer.dom = {};
    thisPathcomputer.dom.cells = thisPathcomputer.getCells();
    thisPathcomputer.dom.wrapper = document.querySelector(select.pathfinderWrapper);
    thisPathcomputer.render();
        
  }
  getCells(){
    const cells = document.querySelectorAll(select.all.cells);
    console.log(Array.from(cells).map(cell => cell.outerHTML).join(''));
    return cells;
  }
  render(){
    const thisPathcomputer = this;
    const markup = Array.from(thisPathcomputer.dom.cells).map(cell => cell.outerHTML).join('');
    thisPathcomputer.dom.wrapper.innerHTML = markup;
  }
}

export default Pathcomputer;