import {classNames, select} from './settings.js';
import Homepage from './components/Homepage.js';
import Pathfinder from './components/Pathfinder.js';

class App {
  constructor(){
    this.getElements();
    this.renderHomepage();
    this.renderPathfinder();
    this.findAndActivatePageMatchingHash(this.pageMatchingHash);    
  }
  findAndActivatePageMatchingHash(){
    const thisApp = this;
    let idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = this.dom.pages[0].id;
    for(let page of this.dom.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }
    this.activatePage(pageMatchingHash);
    for(let link of this.dom.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();
        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
        window.location.hash = '#/'+ id;
      });
    }
  }
  getElements(){
    this.dom = {};
    this.dom.homeWrapper = document.querySelector(select.wrapperOf.homePage);
    this.dom.pathfinderWrapper = document.querySelector(select.wrapperOf.pathfinder);
    this.dom.navLinks = document.querySelectorAll(select.all.navlinks);
    this.dom.pages = document.querySelector(select.wrapperOf.pages).children;
  }
  renderHomepage(){
    new Homepage(this.dom.homeWrapper);
  }
  renderPathfinder(){
    new Pathfinder(this.dom.pathfinderWrapper);
  }
  activatePage(pageId){
    for(let page of this.dom.pages){
      console.log(page);
      page.classList.toggle(classNames.hidden, page.id != pageId);
    }
  }


}

new App();