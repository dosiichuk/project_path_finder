import {select} from './settings.js';
import Homepage from './components/Homepage.js';

class App {
  constructor(){
    this.getElements();
    this.renderHomepage();
  }
  getElements(){
    this.dom = {};
    this.dom.homeWrapper = document.querySelector(select.wrapperOf.homePage);
  }
  renderHomepage(){
    new Homepage(this.dom.homeWrapper);
  }

}

new App();